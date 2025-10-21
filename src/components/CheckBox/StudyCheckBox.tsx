import React, { useEffect, useId, useRef } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import clsx from 'clsx'

const boxVariants = cva(
  [
    'inline-flex shrink-0 items-center justify-center rounded-[6px] border transition-colors',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent',
  ].join(' '),
  {
    variants: {
      size: { sm: 'h-4 w-4', md: 'h-5 w-5', lg: 'h-6 w-6' },
      state: {
        unchecked: 'border-gray-400 bg-transparent',
        checked: 'border-primary-400 bg-primary-400',
        indeterminate: 'border-primary-400 bg-primary-400',
        disabled: 'border-gray-500 bg-gray-700 opacity-60 cursor-not-allowed',
      },
    },
    defaultVariants: { size: 'md', state: 'unchecked' },
  },
)

const iconVariants = cva('text-black', {
  variants: { size: { sm: 'h-3 w-3', md: 'h-3.5 w-3.5', lg: 'h-4 w-4' } },
  defaultVariants: { size: 'md' },
})

export type CheckboxSize = VariantProps<typeof boxVariants>['size']

type BaseProps = {
  id?: string
  name?: string
  value?: string
  checked?: boolean
  defaultChecked?: boolean
  indeterminate?: boolean
  disabled?: boolean
  required?: boolean
  ariaLabel?: string
  label?: React.ReactNode
  description?: React.ReactNode
  onCheckedChange?: (checked: boolean) => void
  className?: string
  boxClassName?: string
}

// React 19: ref를 표준 prop으로 받음
export type CheckboxProps = BaseProps &
  VariantProps<typeof boxVariants> &
  Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'size' | 'checked' | 'defaultChecked' | 'onChange' | 'aria-label'
  > & {
    ref?: React.Ref<HTMLInputElement>
  }

export const StudyCheckBox = ({
  id,
  name,
  value,
  checked,
  defaultChecked,
  indeterminate = false,
  disabled = false,
  required,
  ariaLabel,
  label,
  description,
  onCheckedChange,
  size = 'md',
  className = '',
  boxClassName = '',
  ref, // ← React 19
  ...rest
}: CheckboxProps) => {
  const generatedId = useId()
  const innerRef = useRef<HTMLInputElement>(null)
  const controlId = id ?? `${generatedId}-checkbox`

  // 외부 ref 연결 (object/function 둘 다 지원)
  useEffect(() => {
    if (!ref) return
    if (typeof ref === 'function') ref(innerRef.current)
    else (ref as React.MutableRefObject<HTMLInputElement | null>).current = innerRef.current
  }, [ref])

  // indeterminate 동기화
  useEffect(() => {
    if (innerRef.current) innerRef.current.indeterminate = !!indeterminate
  }, [indeterminate])

  const isChecked = checked ?? undefined
  const state: NonNullable<VariantProps<typeof boxVariants>['state']> = disabled
    ? 'disabled'
    : indeterminate
      ? 'indeterminate'
      : isChecked
        ? 'checked'
        : defaultChecked
          ? 'checked'
          : 'unchecked'

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = e => {
    onCheckedChange?.(e.target.checked)
  }

  return (
    <label htmlFor={controlId} className={clsx('flex items-start gap-2 select-none', className)}>
      <input
        ref={innerRef}
        id={controlId}
        name={name}
        value={value}
        type="checkbox"
        className="peer absolute h-px w-px -translate-x-[9999px] overflow-hidden p-0 opacity-0"
        checked={checked}
        defaultChecked={defaultChecked}
        disabled={disabled}
        required={required}
        aria-label={ariaLabel}
        aria-checked={indeterminate ? 'mixed' : isChecked}
        onChange={handleChange}
        {...rest}
      />

      <span
        role="checkbox"
        aria-checked={indeterminate ? 'mixed' : isChecked}
        aria-disabled={disabled}
        tabIndex={disabled ? -1 : 0}
        className={clsx(
          boxVariants({ size, state }),
          !disabled && 'hover:border-primary-300 cursor-pointer active:brightness-95',
          boxClassName,
        )}
      >
        <svg viewBox="0 0 24 24" className={iconVariants({ size })} aria-hidden>
          {indeterminate ? (
            <rect x="5" y="11" width="14" height="2" rx="1" fill="currentColor" />
          ) : (
            <path
              d="M20 6L9 17l-5-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={clsx(!(checked ?? defaultChecked) && 'opacity-0 peer-checked:opacity-100')}
            />
          )}
        </svg>
      </span>

      {(label || description) && (
        <span className="flex flex-col">
          {label && <span className="text-yds-b2 text-primary-100">{label}</span>}
          {description && <span className="text-yds-c2 text-gray-400">{description}</span>}
        </span>
      )}
    </label>
  )
}
