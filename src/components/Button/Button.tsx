'use client';

import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-lg font-bold focus:outline-none transition-colors duration-200 disabled:opacity-50 disabled:pointer-events-none',
  {
    variants: {
      size: {
        sm: 'h-9 text-sm w-20',
        md: 'h-11 text-base w-[120px]',
        lg: 'h-14 text-lg w-40',
        full: 'h-11 text-base w-full',
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
        class: 'bg-primary-400 text-black hover:bg-primary-500',
      },
      // Outlined
      {
        variant: 'outlined',
        color: 'primary',
        class: 'border-primary-400 text-primary-400 hover:text-primary-300',
      },
    ],
    defaultVariants: {
      size: 'md',
      variant: 'fill',
      color: 'primary',
    },
  }
);

// 타입 export
export type ButtonSize = VariantProps<typeof buttonVariants>['size'];
export type ButtonVariant = VariantProps<typeof buttonVariants>['variant'];
export type ButtonColor = VariantProps<typeof buttonVariants>['color'];

type ButtonProps = {
  ref?: React.Ref<HTMLButtonElement>;
  isActive?: boolean;
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>;

export function Button({
  size,
  variant,
  color,
  children,
  className = '',
  ref,
  ...props
}: ButtonProps) {
  return (
    <button
      ref={ref}
      className={buttonVariants({ size, variant, color, className })}
      tabIndex={0}
      aria-label={
        props['aria-label'] ||
        (typeof children === 'string' ? children : 'button')
      }
      {...props}
    >
      {children}
    </button>
  );
}

Button.displayName = 'Button';
