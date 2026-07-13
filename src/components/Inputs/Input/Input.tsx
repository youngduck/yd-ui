/**
 * 작성자: KYD
 * 기능: 사용자 입력을 받는 기본 입력 필드 컴포넌트
 * 프로세스 설명: 검색, 텍스트 입력, 폼 입력 등에 사용. 색상·간격·타이포그래피는 디자인 토큰에서 일괄 적용
 */

import React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { Search } from 'lucide-react'

const wrapperVariants = cva('yds-input-wrapper', {
  variants: {
    color: {
      white: 'yds-input-wrapper-white',
      'primary-400': 'yds-input-wrapper-primary-400',
      'primary-100': 'yds-input-wrapper-primary-100',
    },
  },
  defaultVariants: {
    color: 'primary-100',
  },
})

const inputVariants = cva('yds-input', {
  variants: {
    size: {
      sm: 'yds-input-sm',
      md: 'yds-input-md',
      lg: 'yds-input-lg',
      full: 'yds-input-full',
    },
    color: {
      white: 'yds-input-white',
      'primary-400': 'yds-input-primary-400',
      'primary-100': 'yds-input-primary-100',
    },
    variant: {
      search: 'yds-input-variant-search',
      input: 'yds-input-variant-input',
    },
  },
  defaultVariants: {
    size: 'md',
    color: 'primary-100',
    variant: 'input',
  },
})

export type InputSize = VariantProps<typeof inputVariants>['size']
export type InputColor = VariantProps<typeof inputVariants>['color']
export type InputVariant = VariantProps<typeof inputVariants>['variant']

export type InputProps = {} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'color'> &
  VariantProps<typeof inputVariants>

export function Input({ size, color, variant, disabled, className = '', ...props }: InputProps) {
  return (
    <div className={`${wrapperVariants({ color })} ${className}`}>
      <input className={inputVariants({ size, color, variant })} disabled={disabled} {...props} />
      {/* 아이콘은 input 뒤에 위치해야 input:disabled + 형제 선택자로 투명도가 동기화됨 (absolute 라 시각 위치는 동일) */}
      {variant === 'search' && <Search aria-hidden className="yds-input-icon" />}
    </div>
  )
}

Input.displayName = 'Input'
