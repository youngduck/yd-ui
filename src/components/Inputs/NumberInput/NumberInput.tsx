/**
 * 작성자: KYD
 * 기능: 금액·수량 등 숫자 전용 입력 필드 컴포넌트
 * 프로세스 설명: type="number" 의 네이티브 스핀 버튼·휠 증감 문제를 피하기 위해
 * type="text" + inputMode="numeric" 조합에 천단위 콤마 포맷팅을 얹은 spinbutton 패턴입니다.
 * 값은 콤마 없는 숫자 문자열('400000')로 전달됩니다. (0 이상 정수만 지원)
 */

import React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

const numberInputVariants = cva('yds-number-input', {
  variants: {
    size: {
      sm: 'yds-number-input-sm',
      md: 'yds-number-input-md',
      lg: 'yds-number-input-lg',
      full: 'yds-number-input-full',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

// 타입 export
export type NumberInputSize = VariantProps<typeof numberInputVariants>['size']

type NumberInputProps = {
  /** 현재 값 (콤마 없는 숫자 문자열, 미입력 시 빈 문자열) */
  value: string
  /** 값이 변경될 때 호출 (콤마 없는 숫자 문자열 전달) */
  onValueChange: (value: string) => void
  /** 최소값 (blur 시 보정, 방향키 증감 하한) */
  min?: number
  /** 최대값 (blur 시 보정, 방향키 증감 상한) */
  max?: number
  /** 방향키(↑/↓) 증감 단위 */
  step?: number
  /** 입력 앞에 표시할 단위 문구 (예: '₩') */
  prefix?: string
  /** 입력 뒤에 표시할 단위 문구 (예: '원') */
  suffix?: string
  /** 텍스트 정렬 (숫자 관례상 기본 우측 정렬) */
  align?: 'left' | 'right'
  /** 입력 필드 비활성화 여부 */
  disabled?: boolean
} & Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'value' | 'onChange' | 'size' | 'type' | 'prefix' | 'min' | 'max' | 'step'
> &
  VariantProps<typeof numberInputVariants>

// 숫자 문자열에 천단위 콤마 삽입 ('400000' → '400,000')
const addComma = (digits: string) => digits.replace(/\B(?=(\d{3})+(?!\d))/g, ',')

// 입력 문자열에서 숫자만 추출하고 선행 0 제거 ('00,7ab' → '7')
const toDigits = (raw: string) => raw.replace(/\D/g, '').replace(/^0+(?=\d)/, '')

const clamp = (num: number, min?: number, max?: number) => {
  if (min !== undefined && num < min) return min
  if (max !== undefined && num > max) return max
  return num
}

export function NumberInput({
  value,
  onValueChange,
  min,
  max,
  step = 1,
  prefix,
  suffix,
  align = 'right',
  disabled,
  size,
  className = '',
  onBlur,
  onKeyDown,
  ...props
}: NumberInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onValueChange(toDigits(e.target.value))
  }

  // blur 시 min/max 범위 밖 값 보정
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (value !== '') {
      const clamped = clamp(Number(value), min, max)
      if (String(clamped) !== value) onValueChange(String(clamped))
    }
    onBlur?.(e)
  }

  // ↑/↓ 방향키로 step 단위 증감 (spinbutton 패턴)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      e.preventDefault()

      // 빈 값에서는 min(없으면 0)을 기준으로 증감을 시작해 네이티브 스핀 동작과 유사하게
      const base = value === '' ? (min ?? 0) : Number(value)
      // 음수 미지원: 하한은 min 과 0 중 큰 값
      const next = clamp(Math.max(base + (e.key === 'ArrowUp' ? step : -step), 0), min, max)
      onValueChange(String(next))
    } else if (e.key === 'Backspace') {
      // 커서 바로 앞이 콤마면 콤마와 그 왼쪽 숫자를 함께 삭제
      // (콤마만 지우면 포맷터가 콤마를 되살려 Backspace 가 동작하지 않는 것처럼 보임)
      const { selectionStart, selectionEnd, value: displayValue } = e.currentTarget
      if (selectionStart !== null && selectionStart === selectionEnd && displayValue[selectionStart - 1] === ',') {
        e.preventDefault()
        const nextValue = displayValue.slice(0, selectionStart - 2) + displayValue.slice(selectionStart)
        onValueChange(toDigits(nextValue))
      }
    }
    onKeyDown?.(e)
  }

  return (
    <div
      className={`${numberInputVariants({ size })}${disabled ? ' yds-number-input-disabled' : ''} ${className}`}
    >
      {prefix && (
        <span className="yds-number-input-affix" aria-hidden="true">
          {prefix}
        </span>
      )}
      <input
        type="text"
        inputMode="numeric"
        role="spinbutton"
        aria-valuenow={value === '' ? undefined : Number(value)}
        aria-valuemin={min}
        aria-valuemax={max}
        disabled={disabled}
        value={value === '' ? '' : addComma(value)}
        className={`yds-number-input-field${align === 'left' ? ' yds-number-input-field-left' : ''}`}
        onChange={handleChange}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        {...props}
      />
      {suffix && (
        <span className="yds-number-input-affix" aria-hidden="true">
          {suffix}
        </span>
      )}
    </div>
  )
}

NumberInput.displayName = 'NumberInput'
