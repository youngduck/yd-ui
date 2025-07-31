'use client'

import React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

const buttonVariants = cva(
  'flex h-12 items-center justify-center rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:pointer-events-none yds-button-typography font-yds-wanted',
  {
    variants: {
      size: {
        sm: 'w-20',
        md: 'w-[120px]',
        lg: 'w-40',
        full: 'w-full',
      },
      variant: {
        fill: '',
        outlined: 'bg-transparent border-2',
      },
      color: {
        primary: '',
      },
    },
    compoundVariants: [
      // Fill
      {
        variant: 'fill',
        color: 'primary',
        class: 'bg-primary-400 text-black',
      },
      // Outlined
      {
        variant: 'outlined',
        color: 'primary',
        class: 'border-primary-400 text-primary-400',
      },
    ],
    defaultVariants: {
      size: 'md',
      variant: 'fill',
      color: 'primary',
    },
  },
)

// 타입 export
export type ButtonSize = VariantProps<typeof buttonVariants>['size']
export type ButtonVariant = VariantProps<typeof buttonVariants>['variant']
export type ButtonColor = VariantProps<typeof buttonVariants>['color']

type ButtonProps = {
  ref?: React.Ref<HTMLButtonElement>
  isActive?: boolean
  children: React.ReactNode
} & React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>

// 버튼 크기에 따른 타이포그래피 설정 (yds 변수 사용)
const getTypographyStyle = (size: ButtonSize) => {
  switch (size) {
    case 'sm':
      return {
        '--yds-button-font-size': 'var(--yds-s2-font-size)',
        '--yds-button-line-height': 'var(--yds-s2-line-height)',
        '--yds-button-font-weight': 'var(--yds-s2-font-weight)',
      }
    case 'md':
      return {
        '--yds-button-font-size': 'var(--yds-s2-font-size)',
        '--yds-button-line-height': 'var(--yds-s2-line-height)',
        '--yds-button-font-weight': 'var(--yds-s2-font-weight)',
      }
    case 'lg':
      return {
        '--yds-button-font-size': 'var(--yds-s2-font-size)',
        '--yds-button-line-height': 'var(--yds-s2-line-height)',
        '--yds-button-font-weight': 'var(--yds-s2-font-weight)',
      }
    case 'full':
      return {
        '--yds-button-font-size': 'var(--yds-s2-font-size)',
        '--yds-button-line-height': 'var(--yds-s2-line-height)',
        '--yds-button-font-weight': 'var(--yds-s2-font-weight)',
      }
    default:
      return {
        '--yds-button-font-size': 'var(--yds-s2-font-size)',
        '--yds-button-line-height': 'var(--yds-s2-line-height)',
        '--yds-button-font-weight': 'var(--yds-s2-font-weight)',
      }
  }
}

export function Button({ size = 'md', variant, color, children, className = '', ref, ...props }: ButtonProps) {
  // 토스와 동일한 element.style 그룹핑을 위한 스타일 (yds 변수 사용)
  const buttonStyle = getTypographyStyle(size) as React.CSSProperties

  return (
    <button
      ref={ref}
      className={buttonVariants({ size, variant, color, className })}
      style={buttonStyle}
      tabIndex={0}
      aria-label={props['aria-label'] || (typeof children === 'string' ? children : 'button')}
      {...props}
    >
      {children}
    </button>
  )
}

Button.displayName = 'Button'
