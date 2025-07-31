'use client'

import React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

const buttonVariants = cva('yds-button', {
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
      class: 'bg-primary-300 text-black',
    },
    // Outlined
    {
      variant: 'outlined',
      color: 'primary',
      class: 'border-primary-300 text-primary-300',
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

type ButtonProps = {
  ref?: React.Ref<HTMLButtonElement>
  isActive?: boolean
  children: React.ReactNode
} & React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>

export function Button({ size = 'md', variant, color, children, className = '', ref, ...props }: ButtonProps) {
  return (
    <button
      ref={ref}
      className={buttonVariants({ size, variant, color, className })}
      tabIndex={0}
      aria-label={props['aria-label'] || (typeof children === 'string' ? children : 'button')}
      {...props}
    >
      {children}
    </button>
  )
}

Button.displayName = 'Button'
