import { cva, type VariantProps } from 'class-variance-authority'
import { ReactNode } from 'react'

export interface IModal extends VariantProps<typeof modalSizeVariants> {
  onClose: () => void
  children: React.ReactNode
}

export const modalSizeVariants = cva('yds-modal z-modal', {
  variants: {
    size: {
      sm: 'yds-modal-size-sm',
      md: 'yds-modal-size-md',
      lg: 'yds-modal-size-lg',
      xl: 'yds-modal-size-xl',
    },
  },
})

export interface IModalConfig {
  size: 'sm' | 'md' | 'lg' | 'xl'
}

export interface IModalOpenRequestData {
  config: IModalConfig
  content: ReactNode | ((onClose: () => void) => ReactNode)
}
