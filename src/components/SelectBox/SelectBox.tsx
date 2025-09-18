/**
 * 작성자: KYD
 * 기능: 사용자 선택을 받는 선택박스 컴포넌트, 검색기능도 같이 제공
 * 프로세스 설명: 선택박스 컴포넌트
 */

import { useState } from 'react'
import { Check, ChevronDown, Search } from 'lucide-react'
import { cva, type VariantProps } from 'class-variance-authority'

export type SelectBoxOptions = {
  label: string
  value: string
}

export type SelectBoxProps = {
  options: {
    lists: SelectBoxOptions[]
    search: boolean
  }
} & VariantProps<typeof wrapperVariants>

const wrapperVariants = cva('relative h-12 text-white', {
  variants: {
    size: {
      sm: 'w-[200px]',
      md: 'w-[300px]',
      lg: 'w-[400px]',
      full: 'w-full',
    },
  },
  defaultVariants: {
    size: 'full',
  },
})

export function SelectBox({ size, options: { lists, search } }: SelectBoxProps) {
  const [isToggleOpen, setIsToggleOpen] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const [selectedOption, setSelectedOption] = useState<SelectBoxOptions | null>(null)

  const handleSelectBoxToggle = () => {
    setIsToggleOpen(!isToggleOpen)
  }

  const handleOptionClick = (option: SelectBoxOptions) => {
    setSelectedOption(option)
    setIsToggleOpen(false)
  }

  return (
    <div className={wrapperVariants({ size })}>
      <div
        className="text-primary-100 border-primary-100 text-yds-b1 absolute top-0 left-0 flex h-full w-full cursor-pointer items-center justify-between rounded-lg border-2 p-3"
        onClick={handleSelectBoxToggle}
      >
        {!selectedOption && '선택'}
        {selectedOption && selectedOption.value}
        <ChevronDown className="text-primary-100 transition-transform duration-300" />
      </div>
      {isToggleOpen && (
        <div className="bg-background-secondary border-primary-100 absolute top-14 left-0 flex h-auto w-full flex-col gap-2 rounded-lg border-2 p-3">
          {search && (
            <div className="border-primary-100 flex h-[40px] items-center border-y-2">
              <Search className="text-primary-100" size={20} />
              <input
                type="text"
                className="w-full p-2 hover:outline-none focus:outline-none"
                value={searchValue}
                placeholder="검색으로 쉽게찾기"
                onChange={e => setSearchValue(e.target.value)}
              />
            </div>
          )}
          {lists
            .filter(option => option.value.includes(searchValue))
            .map(option => (
              <div
                key={option.label}
                className="text-yds-c1m hover:bg-background-primary flex cursor-pointer items-center justify-between"
                onClick={() => handleOptionClick(option)}
              >
                {option.value}
                {selectedOption?.label === option.label && <Check className="text-primary-100" size={20} />}
              </div>
            ))}
        </div>
      )}
    </div>
  )
}

SelectBox.displayName = 'SelectBox'
