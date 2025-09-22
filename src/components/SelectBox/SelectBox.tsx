/**
 * 작성자: KYD
 * 기능: 사용자 선택을 받는 선택박스 컴포넌트, 검색기능도 같이 제공
 * 프로세스 설명: 선택박스 컴포넌트
 */

import { Check, ChevronDown, Search } from 'lucide-react'
import { cva, type VariantProps } from 'class-variance-authority'
import { useSelectBox } from './hooks/useSelectBox'

const wrapperVariants = cva('relative h-12', {
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
export type SelectBoxProps = {
  selectBoxHook: ReturnType<typeof useSelectBox>
} & VariantProps<typeof wrapperVariants>

export function SelectBox({ size, selectBoxHook }: SelectBoxProps) {
  const {
    selectedOption,
    isOpen,
    searchValue,
    options,
    search,
    containerRef,
    handleClickOption,
    handleToggle,
    handleSearch,
    hasOption,
  } = selectBoxHook

  return (
    <div className={wrapperVariants({ size })} ref={containerRef}>
      <div
        className="text-primary-100 border-primary-100 text-yds-b1 absolute top-0 left-0 flex h-full w-full cursor-pointer items-center justify-between rounded-lg border-2 p-3"
        onClick={handleToggle}
      >
        {!hasOption && '선택'}
        {hasOption && selectedOption.value}
        <ChevronDown className="text-primary-100 transition-transform duration-300" />
      </div>
      {isOpen && (
        <div className="bg-background-secondary border-primary-100 absolute top-14 left-0 flex h-auto w-full flex-col gap-2 rounded-lg border-2 p-3">
          {search && (
            <div className="border-primary-100 flex h-[40px] items-center border-y-2">
              <Search className="text-primary-100" size={20} />
              <input
                type="text"
                className="w-full p-2 text-white hover:outline-none focus:outline-none"
                value={searchValue}
                placeholder="검색으로 쉽게찾기"
                onChange={e => handleSearch(e.target.value)}
              />
            </div>
          )}
          {options
            .filter(option => option.value.includes(searchValue))
            .map(option => (
              <div
                key={option.label}
                className="text-yds-c1m hover:bg-background-primary flex cursor-pointer items-center justify-between text-white"
                onClick={() => handleClickOption(option)}
              >
                {option.value}
                {selectedOption.value === option.value && <Check className="text-primary-100" size={20} />}
              </div>
            ))}
        </div>
      )}
    </div>
  )
}
