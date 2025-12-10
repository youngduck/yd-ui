import React, { useId, useRef, useEffect } from 'react'
import { CheckIcon, Minus } from 'lucide-react'

// input태그 기본제공속성중 type, size, checked, onChange, onCheckedChange 제외한 속성을 받을 수 있도록
// checked는 필수로만들어서 제어 모드로 사용하기 위함, type은 checkbox로 고정
type CheckboxInputAttributes = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'type' | 'checked' | 'onChange' | 'onCheckedChange' | 'indeterminate'
> & {
  type?: never
  shape?: 'square' | 'check'
}

type CheckBoxVariants = CheckboxInputAttributes & {
  checked: boolean // 필수로 만들어서 제어모드로만 사용하도록
  onCheckedChange: (checked: boolean) => void
  indeterminate?: boolean // 부분 선택 상태
}

export function CheckBox({
  value,
  name,
  checked,
  id,
  onCheckedChange,
  shape = 'square',
  indeterminate = false,
  ...props
}: CheckBoxVariants) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newChecked = e.target.checked

    onCheckedChange(newChecked)
  }

  const checkboxId = id ?? useId()
  const inputRef = useRef<HTMLInputElement>(null)

  // indeterminate 상태를 input 요소에 설정
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = indeterminate
    }
  }, [indeterminate])

  // indeterminate일 때는 checked 상태를 무시
  const displayState = indeterminate ? 'indeterminate' : checked ? 'checked' : 'unchecked'

  const handleKeyDown = (e: React.KeyboardEvent<HTMLLabelElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      onCheckedChange(!checked)
    }
  }

  return (
    <label htmlFor={checkboxId} className="yds-checkbox-wrapper" onKeyDown={handleKeyDown} tabIndex={0}>
      <input
        ref={inputRef}
        id={checkboxId}
        type="checkbox"
        checked={checked}
        onChange={handleChange}
        className="sr-only"
        aria-checked={indeterminate ? 'mixed' : checked ? 'true' : 'false'}
        {...props}
      />

      {/*네모체크박스 영역 */}
      {shape === 'square' && (
        <div className="yds-checkbox-indicator">
          <div className={`yds-checkbox-indicator-inner-${displayState}`}>{indeterminate && <Minus size={20} />}</div>
        </div>
      )}

      {/* V체크 아이콘 영역 */}
      {shape === 'check' && (
        <div className="yds-checkbox-icon-indicator">
          {indeterminate ? (
            <div>
              <Minus size={20} />
            </div>
          ) : checked ? (
            <CheckIcon size={20} />
          ) : (
            <></>
          )}
        </div>
      )}

      <span className={`yds-checkbox-typography`}>{value}</span>
    </label>
  )
}

CheckBox.displayName = 'CheckBox'
