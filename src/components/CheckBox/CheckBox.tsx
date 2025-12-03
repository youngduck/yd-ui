import React, { useId } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { CheckIcon } from 'lucide-react'

const checkboxVariants = cva('yds-checkbox-typography', {
  variants: {
    size: {
      sm: 'w-4 h-4',
      md: 'w-6 h-6 text-red-500',
      lg: 'w-8 h-8',
    },
  },
})

// input태그 기본제공속성중 type, size, checked, onChange, onCheckedChange 제외한 속성을 받을 수 있도록
// checked는 필수로만들어서 제어 모드로 사용하기 위함, type은 checkbox로 고정
type CheckboxInputAttributes = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'type' | 'size' | 'checked' | 'onChange' | 'onCheckedChange'
> & {
  type?: never
}

type CheckBoxVariants = CheckboxInputAttributes &
  VariantProps<typeof checkboxVariants> & {
    checked: boolean // 필수로 만들어서 제어모드로만 사용하도록
    onCheckedChange: (checked: boolean) => void
  }

export function CheckBox({ size, value, name, checked, id, onCheckedChange, ...props }: CheckBoxVariants) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newChecked = e.target.checked

    onCheckedChange(newChecked)
  }

  // id설정 없이 자동 생성 후 연결
  const checkboxId = useId()

  return (
    <label htmlFor={checkboxId} className="flex items-center gap-2">
      <input id={checkboxId} type="checkbox" checked={checked} onChange={handleChange} className="sr-only" {...props} />
      {/*네모체크박스 영역 */}
      <div className="yds-checkbox-indicator">
        <div className={`yds-checkbox-indicator-inner-${checked ? 'checked' : 'unchecked'}`}></div>
      </div>

      {/* 브이체크박스 영역 */}
      <span>{checked ? <CheckIcon /> : <>ㅇㅇ</>}</span>
      {value}
    </label>
  )
}

CheckBox.displayName = 'CheckBox'
