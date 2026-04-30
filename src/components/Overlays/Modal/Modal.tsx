/**
 * 작성자: KYD
 * 기능:
 * 프로세스 설명: 프로세스 복잡시 노션링크 첨부권장
 */
import React from 'react'
import { IModal, modalSizeVariants } from './ModalTypes'
import { useFocusTrap } from '../hooks/useFocusTrap'

export const Modal = ({ onClose, children, size }: IModal) => {
  const focusTrapRef = useFocusTrap<HTMLDivElement>()

  //SECTION 메서드 영역
  const handleCloseBubble = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Escape') {
      onClose()
    }
  }
  //!SECTION 메서드 영역

  return (
    <div
      className="yds-modal-backdrop"
      onClick={handleCloseBubble}
      onKeyDown={handleKeyDown}
      role="dialog"
      aria-modal="true"
      tabIndex={-1}
    >
      <div ref={focusTrapRef} className={modalSizeVariants({ size })}>{children}</div>
    </div>
  )
}

Modal.displayName = 'Modal'
