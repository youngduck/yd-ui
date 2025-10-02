'use client'

import React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

const buttonVariants = cva('yds-button-typography', {
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
    disabled: {
      true: 'opacity-50 cursor-wait',
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
})

// 타입 export
export type ButtonSize = VariantProps<typeof buttonVariants>['size']
export type ButtonVariant = VariantProps<typeof buttonVariants>['variant']
export type ButtonColor = VariantProps<typeof buttonVariants>['color']
export type ButtonDisabled = VariantProps<typeof buttonVariants>['disabled']

type ButtonProps = {
  ref?: React.Ref<HTMLButtonElement>
  isActive?: boolean
  children: React.ReactNode
} & React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>

export function Button({
  size = 'md',
  variant,
  color,
  children,
  className = '',
  ref,
  disabled = false,
  ...props
}: ButtonProps) {
  return (
    <button
      ref={ref}
      className={`${buttonVariants({ size, variant, color, className, disabled })}`}
      tabIndex={disabled ? -1 : 0}
      aria-label={props['aria-label'] || (typeof children === 'string' ? children : 'button')}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}

Button.displayName = 'Button'
