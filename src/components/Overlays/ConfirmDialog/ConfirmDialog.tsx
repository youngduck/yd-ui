import React from 'react'
import { Button } from '../../Button/Button'
import { IConfirmDialog } from './ConfirmDialogTypes'

export const ConfirmDialog = ({ title, description, confirmText, cancelText, onConfirm, onCancel }: IConfirmDialog) => {
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
      tabIndex={-1}
      ref={(el) => el?.focus()}
    >
      <div className="yds-confirm-dialog">
        <h2 className="yds-confirm-dialog-title">{title}</h2>
        {description && <p className="yds-confirm-dialog-description">{description}</p>}
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
