/**
 * 작성자: KYD
 * 기능:
 * 프로세스 설명: 프로세스 복잡시 노션링크 첨부권장
 */

import { cva, type VariantProps } from 'class-variance-authority'

const inputVariants = cva('h-12 border-primary-100 border-2 focus:outline-none px-3', {
  variants: {
    variant: {
      default: 'yds-input-typography ',
      outlined: 'yds-input-typography2 bg-transparent',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

type InputVariant = VariantProps<typeof inputVariants>['variant']

type InputProps = {
  variant?: InputVariant
  className?: string
} & React.InputHTMLAttributes<HTMLInputElement>

// InputHTMLAttributes<HTMLInputElement> 기본적인 input 속성들을 사용할 수 있게 해줌

export function Input({ variant, className = '', ...props }: InputProps) {
  return <input className={inputVariants({ variant, className })} {...props} />
}

Input.displayName = 'Input'
