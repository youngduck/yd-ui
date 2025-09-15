/**
 * 작성자: KYD
 * 기능: 사용자 선택을 받는 선택박스 컴포넌트, 검색기능도 같이 제공
 * 프로세스 설명: 선택박스 컴포넌트
 */

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

export type SelectBoxProps = {}

export function SelectBox() {
  const [isToggleOpen, setIsToggleOpen] = useState(false)

  const handleSelectBoxToggle = () => {
    setIsToggleOpen(!isToggleOpen)
  }

  return (
    <div className="relative h-12 w-[300px] text-white">
      <div
        className="border-primary-400 absolute top-0 left-0 flex h-full w-full cursor-pointer items-center justify-between rounded-[8px] border-2 p-3"
        onClick={handleSelectBoxToggle}
      >
        클릭박스zzzz
        <ChevronDown className="text-primary-400" />
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
