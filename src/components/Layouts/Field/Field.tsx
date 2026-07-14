/**
 * 작성자: KYD
 * 기능: 폼 입력 하나를 라벨 + 입력 + 설명/에러 메시지의 표준 구조로 묶는 컴포넌트
 * 프로세스 설명: label 은 htmlFor 로 입력과 연결하고(블록 요소 children 을 label 로 감싸는 HTML 표준 위반 방지),
 * 단일 입력 요소에는 id / aria-describedby / aria-invalid 를 자동 주입해 스크린 리더가 설명·에러를 읽을 수 있게 합니다
 */

import { useId, Children, isValidElement, cloneElement } from 'react'

type InjectedInputProps = {
  id?: string
  'aria-describedby'?: string
  'aria-invalid'?: boolean
}

type FieldProps = {
  /** 입력 위에 표시되는 라벨 */
  label: string
  /** 입력 아래 보조 설명 (에러가 있으면 에러가 우선 표시) */
  description?: string
  /** 에러 메시지. 지정 시 설명 대신 표시 */
  error?: string
  /** 필수 입력 표시(*) 여부 */
  required?: boolean
  /** 라벨과 연결되는 입력 요소 */
  children: React.ReactNode
} & React.ComponentPropsWithoutRef<'div'>

export function Field({ label, description, error, required, children, className = '', ...props }: FieldProps) {
  const uniqueId = useId()
  const messageId = `${uniqueId}-message`
  const hasMessage = Boolean(error || description)

  // 단일 입력 요소면 id / aria 속성을 주입해 라벨·메시지와 연결 (복수/비요소 children 은 그대로 렌더링)
  let inputId = `${uniqueId}-input`
  let content = children
  try {
    const child = Children.only(children)
    if (isValidElement<InjectedInputProps>(child)) {
      inputId = child.props.id ?? inputId
      content = cloneElement(child, {
        id: inputId,
        'aria-describedby': hasMessage ? messageId : undefined,
        'aria-invalid': error ? true : undefined,
      })
    }
  } catch {
    // children 이 단일 요소가 아닌 경우 주입 없이 그대로 반환
  }

  return (
    <div className={`yds-field ${className}`} {...props}>
      <label htmlFor={inputId} className="yds-field-label">
        {label}
        {required && (
          <span className="yds-field-required" aria-hidden="true">
            *
          </span>
        )}
      </label>
      {content}
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
    </div>
  )
}

Field.displayName = 'Field'
