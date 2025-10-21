import { useId } from 'react'

export function CheckBox() {
  const id = useId() + '-yds-checkbox'
  return (
    <label>
      <input type="checkbox" />
      <label>CheckBox</label>
    </label>
  )
}

CheckBox.displayName = 'CheckBox'
