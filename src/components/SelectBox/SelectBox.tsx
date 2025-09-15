/**
 * 작성자: KYD
 * 기능: 사용자 선택을 받는 선택박스 컴포넌트, 검색기능도 같이 제공
 * 프로세스 설명: 선택박스 컴포넌트
 */

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { cva, type VariantProps } from 'class-variance-authority'


export type SelectBoxProps = {
  // options:


} & VariantProps<typeof wrapperVariants>

const wrapperVariants = cva('relative h-12 text-white',{
  variants:{
    size:{
    sm:'w-[200px]',
    md:'w-[300px]',
    lg:'w-[400px]',
    full:'w-full',
  },
  },
  defaultVariants:{
    size:'full',
  },
})

export function SelectBox({ size }: SelectBoxProps) {
  const [isToggleOpen, setIsToggleOpen] = useState(false)

  const handleSelectBoxToggle = () => {
    setIsToggleOpen(!isToggleOpen)
  }

  return (
    <div className={wrapperVariants({ size })}>
      <div
        className="absolute border-primary-100 top-0 left-0 flex h-full w-full cursor-pointer items-center justify-between rounded-[8px] text-yds-b1 border-2 p-3"
        onClick={handleSelectBoxToggle}
      >
        국적
        <ChevronDown className="text-primary-100" />
      </div>
      {isToggleOpen && (
        <div className="bg-background-primary border-background-secondary absolute top-13 left-0 h-full w-full rounded-lg border-2">
          옵션들
        </div>
      )}
    </div>
  )
}

SelectBox.displayName = 'SelectBox'
