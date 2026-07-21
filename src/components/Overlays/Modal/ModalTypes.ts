import { cva, type VariantProps } from 'class-variance-authority'
import { ReactNode } from 'react'

export interface IModal extends VariantProps<typeof modalSizeVariants> {
  onClose: () => void
  children: React.ReactNode
  /** 상단에 고정되는 제목 영역 (스크롤되지 않음) */
  title?: React.ReactNode
  /** 하단에 고정되는 버튼 영역 (스크롤되지 않음) */
  footer?: React.ReactNode
}

export const modalSizeVariants = cva('yds-modal', {
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
  /** 상단에 고정되는 제목. 넘기면 스크롤과 무관하게 항상 보입니다. */
  title?: ReactNode
  /**
   * 하단에 고정되는 버튼 영역. 넘기면 스크롤과 무관하게 항상 보입니다.
   * content와 동일하게 onClose 콜백을 받는 함수형도 지원합니다.
   */
  footer?: ReactNode | ((onClose: () => void) => ReactNode)
}

export interface IModalOpenRequestData {
  config: IModalConfig
  content: ReactNode | ((onClose: () => void) => ReactNode)
}
