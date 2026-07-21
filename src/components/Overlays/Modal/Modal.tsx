/**
 * 작성자: KYD
 * 기능:
 * 프로세스 설명: 프로세스 복잡시 노션링크 첨부권장
 */
import React, { useId } from 'react'
import { IModal, modalSizeVariants } from './ModalTypes'
import { useFocusTrap } from '../hooks/useFocusTrap'

export const Modal = ({ onClose, children, size, title, footer }: IModal) => {
  const focusTrapRef = useFocusTrap<HTMLDivElement>()
  const titleId = useId()

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
    <div className="yds-modal-backdrop" onClick={handleCloseBubble} onKeyDown={handleKeyDown} tabIndex={-1}>
      <div
        ref={focusTrapRef}
        className={modalSizeVariants({ size })}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        tabIndex={-1}
      >
        {title && (
          <header className="yds-modal-header">
            <h2 id={titleId} className="yds-modal-title">
              {title}
            </h2>
          </header>
        )}
        <div className="yds-modal-body">{children}</div>
        {footer && <footer className="yds-modal-footer">{footer}</footer>}
      </div>
    </div>
  )
}

Modal.displayName = 'Modal'
