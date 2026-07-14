/**
 * 작성자: KYD
 * 기능: 폼 입력 하나를 라벨 + 입력 + 설명/에러 메시지의 표준 구조로 묶는 컴포넌트
 * 프로세스 설명: label 요소로 감싸므로 네이티브 input 은 라벨 클릭 시 자동으로 포커스됩니다
 */

import { useId } from 'react'

type FieldProps = {
  /** 입력 위에 표시되는 라벨 */
  label: string
  /** 입력 아래 보조 설명 (에러가 있으면 에러가 우선 표시) */
  description?: string
  /** 에러 메시지. 지정 시 설명 대신 표시 */
  error?: string
  /** 필수 입력 표시(*) 여부 */
  required?: boolean
  /** 라벨이 감쌀 입력 요소 */
  children: React.ReactNode
} & Omit<React.ComponentPropsWithoutRef<'label'>, 'children'>

export function Field({ label, description, error, required, children, className = '', ...props }: FieldProps) {
  const messageId = useId()

  return (
    <label className={`yds-field ${className}`} {...props}>
      <span className="yds-field-label">
        {label}
        {required && (
          <span className="yds-field-required" aria-hidden="true">
            *
          </span>
        )}
      </span>
      {children}
      {error ? (
        <span id={messageId} className="yds-field-error" role="alert">
          {error}
        </span>
      ) : (
        description && (
          <span id={messageId} className="yds-field-description">
            {description}
          </span>
        )
      )}
    </label>
  )
}

Field.displayName = 'Field'
