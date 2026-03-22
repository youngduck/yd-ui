import { ReactNode } from 'react'

export interface IConfirmDialogOpenRequestData {
  title: string
  description?: ReactNode
  confirmText?: string
  cancelText?: string
  onConfirm: () => void | Promise<void>
  onCancel?: () => void
}

export interface IConfirmDialog {
  title: string
  description?: ReactNode
  confirmText: string
  cancelText: string
  onConfirm: () => void | Promise<void>
  onCancel: () => void
}
