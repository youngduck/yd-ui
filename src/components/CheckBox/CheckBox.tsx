import React, { useId } from 'react'
import { CheckIcon } from 'lucide-react'

// input태그 기본제공속성중 type, size, checked, onChange, onCheckedChange 제외한 속성을 받을 수 있도록
// checked는 필수로만들어서 제어 모드로 사용하기 위함, type은 checkbox로 고정
type CheckboxInputAttributes = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'type' | 'size' | 'checked' | 'onChange' | 'onCheckedChange'
> & {
  type?: never
  shape?: 'square' | 'check'
}

type CheckBoxVariants = CheckboxInputAttributes & {
  checked: boolean // 필수로 만들어서 제어모드로만 사용하도록
  onCheckedChange: (checked: boolean) => void
}

export function CheckBox({ value, name, checked, id, onCheckedChange, shape = 'square', ...props }: CheckBoxVariants) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newChecked = e.target.checked

    onCheckedChange(newChecked)
  }

  const checkboxId = id ?? useId()

  return (
    <label htmlFor={checkboxId} className="flex items-center gap-2">
      <input id={checkboxId} type="checkbox" checked={checked} onChange={handleChange} className="sr-only" {...props} />

      {/*네모체크박스 영역 */}
      {shape === 'square' && (
        <div className="yds-checkbox-indicator">
          <div className={`yds-checkbox-indicator-inner-${checked ? 'checked' : 'unchecked'}`}></div>
        </div>
      )}

      {/* V체크 아이콘 영역 */}
      {shape === 'check' && (
        <div className="yds-checkbox-icon-indicator">{checked ? <CheckIcon size={20} /> : <></>}</div>
      )}

      <span className={`yds-checkbox-typography`}>{value}</span>
    </label>
  )
}

CheckBox.displayName = 'CheckBox'
