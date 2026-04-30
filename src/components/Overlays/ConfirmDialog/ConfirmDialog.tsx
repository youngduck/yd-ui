import React, { useId } from 'react'
import { Button } from '../../Button/Button'
import { IConfirmDialog } from './ConfirmDialogTypes'
import { useFocusTrap } from '../hooks/useFocusTrap'

export const ConfirmDialog = ({ title, description, confirmText, cancelText, onConfirm, onCancel }: IConfirmDialog) => {
  const focusTrapRef = useFocusTrap<HTMLDivElement>()
  const titleId = useId()
  const descriptionId = useId()

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onCancel()
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Escape') {
      onCancel()
    }
  }

  const handleConfirm = async () => {
    await onConfirm()
    onCancel()
  }

  return (
    <div
      className="yds-confirm-dialog-backdrop"
      onClick={handleBackdropClick}
      onKeyDown={handleKeyDown}
      role="alertdialog"
      aria-modal="true"
      aria-labelledby={titleId}
      aria-describedby={description ? descriptionId : undefined}
      tabIndex={-1}
    >
      <div ref={focusTrapRef} className="yds-confirm-dialog" tabIndex={1}>
        <h2 id={titleId} className="yds-confirm-dialog-title">
          {title}
        </h2>
        {description && (
          <p id={descriptionId} className="yds-confirm-dialog-description">
            {description}
          </p>
        )}
        <div className="yds-confirm-dialog-actions">
          <Button variant="outlined" color="primary" size="full" onClick={onCancel}>
            {cancelText}
          </Button>
          <Button variant="fill" color="primary" size="full" onClick={handleConfirm}>
            {confirmText}
          </Button>
        </div>
      </div>
    </div>
  )
}

ConfirmDialog.displayName = 'ConfirmDialog'
