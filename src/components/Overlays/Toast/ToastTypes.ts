import { ReactNode } from 'react'

export interface IToastOpenRequestData {
  content: ReactNode
  duration?: number
}

export interface IToast {
  content: ReactNode
  duration: number
  onDismiss: () => void
}