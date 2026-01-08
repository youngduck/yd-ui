/**
 * 작성자: KYD
 * 기능:
 * 프로세스 설명: 프로세스 복잡시 노션링크 첨부권장
 */
import React from 'react'
import { IModal, modalSizeVariants } from './ModalTypes'

export const Modal = ({ onClose, children, size }: IModal) => {
  //SECTION HOOK호출 영역

  //!SECTION HOOK호출 영역

  //SECTION 상태값 영역

  //!SECTION 상태값 영역

  //SECTION 메서드 영역
  const handleCloseBubble = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }
  //!SECTION 메서드 영역

  return (
    <div className="yds-modal-backdrop z-modal-backdrop" onClick={handleCloseBubble}>
      <div className={modalSizeVariants({ size })}>{children}</div>
    </div>
  )
}

Modal.displayName = 'Modal'
