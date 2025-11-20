import React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { CheckIcon, XIcon } from 'lucide-react'

const checkboxVariants = cva('yds-checkbox', {
  variants: {
    size: {
      sm: 'w-4 h-4',
      md: 'w-6 h-6',
      lg: 'w-8 h-8',
    },
  },
})

// input태그 기본제공속성중 type, size, checked, onChange, onCheckedChange 제외한 속성을 받을 수 있도록
// checked는 필수로만들어서 제어 모드로 사용하기 위함
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

  // id가 없을 경우 자동 생성
  const generatedId = React.useId()
  const checkboxId = id ?? generatedId

  return (
    <label htmlFor={checkboxId}>
      <input id={checkboxId} type="checkbox" checked={checked} onChange={handleChange} className="sr-only" {...props} />
      <div className={checkboxVariants({ size })}>
        <span className="yds-checkbox-icon">{checked ? <CheckIcon /> : <XIcon />}</span>
      </div>
      {name && <span>{name}</span>}
      {value && <span>{value}</span>}
    </label>
  )
}

CheckBox.displayName = 'CheckBox'
