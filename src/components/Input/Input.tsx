/**
 * 작성자: KYD
 * 기능: 사용자 입력을 받는 기본 입력 필드 컴포넌트
 * 프로세스 설명: 검색, 텍스트 입력, 폼 입력 등에 사용
 */

import React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { Search } from 'lucide-react'

const wrapperVariants = cva('relative', {
  variants: {
    color: {
      'primary-400': 'text-yellow-400',
      'primary-100': 'text-yellow-100',
      white: 'text-white',
    },
  },
})

const inputVariants = cva('yds-input-typography h-12 rounded-[8px] border-2 pr-3 focus:outline-none', {
  variants: {
    size: {
      sm: 'w-[200px]',
      md: 'w-[300px]',
      lg: 'w-[400px]',
      full: 'w-full',
    },
    color: {
      white: 'border-white bg-transparent text-white placeholder-white',
      'primary-400':
        'border-yellow-400 bg-transparent text-primary-400 placeholder-primary-400',
      'primary-100':
        'border-yellow-100 bg-transparent text-primary-100 placeholder-primary-100',
    },
    variant: {
      search: 'pl-10', // 아이콘 공간
      input: 'pl-3', // 아이콘 없어도 기본 좌패딩
    },
    disabled: {
      true: 'opacity-50 cursor-not-allowed bg-gray-100',
      false: '',
    },
  },
  defaultVariants: {
    size: 'md',
    color: 'primary-100',
    variant: 'input',
    disabled: false,
  },
})

export type InputSize = VariantProps<typeof inputVariants>['size']
export type InputColor = VariantProps<typeof inputVariants>['color']
export type InputVariant = VariantProps<typeof inputVariants>['variant']

export type InputProps = {
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'color'> &
  VariantProps<typeof inputVariants>

export function Input({ size, color, variant, disabled, ...props }: InputProps) {
  return (
    <div className={wrapperVariants({ color })}>
      {variant === 'search' && (
        <Search aria-hidden className="absolute left-3 top-1/2 -translate-y-1/2 w-6 h-6 text-current" />
      )}
      <input className={inputVariants({ size, color, variant, disabled })} disabled={disabled} {...props} />
    </div>
  )
}

Input.displayName = 'Input'
