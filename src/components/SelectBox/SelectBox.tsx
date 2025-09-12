/**
 * 작성자: KYD
 * 기능: 사용자 선택을 받는 선택박스 컴포넌트, 검색기능도 같이 제공
 * 프로세스 설명: 선택박스 컴포넌트
 */

import { useState } from 'react'

export function SelectBox() {
  const [isOpen, setIsOpen] = useState(false)

  const handleSelectBoxToggle = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className="relative h-12 w-[300px]">
      <div
        className="cursor-pointer absolute top-0 left-0 w-full h-full rounded-[8px] border-2 border-primary-400"
        onClick={handleSelectBoxToggle}
      >
        클릭박스
      </div>
      {isOpen && <div className="absolute top-1 left-0 w-full h-full">옵션들</div>}
    </div>
  )
}

SelectBox.displayName = 'SelectBox'
