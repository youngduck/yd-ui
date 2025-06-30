'use client';

import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded font-bold focus:outline-none transition-colors duration-200 disabled:opacity-50 disabled:pointer-events-none',
  {
    variants: {
      size: {
        small: 'h-9 px-4 text-sm',
        medium: 'h-11 px-6 text-base',
        large: 'h-14 px-8 text-lg',
      },
      variant: {
        fill: '',
        outlined: 'bg-transparent',
      },
      color: {
        primary: '',
        secondary: '',
        danger: '',
      },
    },
    compoundVariants: [
      // Fill
      {
        variant: 'fill',
        color: 'primary',
        class: 'bg-yellow-400 text-black hover:bg-yellow-500',
      },
      {
        variant: 'fill',
        color: 'secondary',
        class: 'bg-gray-400 text-black hover:bg-gray-500',
      },
      {
        variant: 'fill',
        color: 'danger',
        class: 'bg-red-500 text-white hover:bg-red-600',
      },
      // Outlined
      {
        variant: 'outlined',
        color: 'primary',
        class:
          'border border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black',
      },
      {
        variant: 'outlined',
        color: 'secondary',
        class:
          'border border-gray-400 text-gray-400 hover:bg-gray-400 hover:text-black',
      },
      {
        variant: 'outlined',
        color: 'danger',
        class:
          'border border-red-500 text-red-500 hover:bg-red-500 hover:text-white',
      },
    ],
    defaultVariants: {
      size: 'medium',
      variant: 'fill',
      color: 'primary',
    },
  }
);

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
