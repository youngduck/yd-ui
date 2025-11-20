import { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { CheckBox } from './CheckBox'

const meta: Meta<typeof CheckBox> = {
  component: CheckBox,
}

export default meta

type Story = StoryObj<typeof CheckBox>

export const Default: Story = {
  render: () => {
    const [isChecked, setIsChecked] = useState(false)

    return <CheckBox id="default-checkbox" name="기본 체크박스" checked={isChecked} onCheckedChange={setIsChecked} />
  },
}

export const AllVariants: Story = {
  render: () => {
    const [checked1, setChecked1] = useState(false)
    const [checked2, setChecked2] = useState(true)

    return (
      <div className="space-y-8">
        <CheckBox id="checkbox-1" name="뭘까연ㅎㅎ" value="zz" checked={checked1} onCheckedChange={setChecked1} />
        <CheckBox id="checkbox-2" name="체크된 상태" checked={checked2} onCheckedChange={setChecked2} />
      </div>
    )
  },
}
