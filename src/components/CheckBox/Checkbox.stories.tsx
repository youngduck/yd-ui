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

    return <CheckBox name="기본 체크박스" checked={isChecked} onCheckedChange={setIsChecked} />
  },
}

export const AllVariants: Story = {
  render: () => {
    const [checked1, setChecked1] = useState(false)
    const [checked2, setChecked2] = useState(true)

    return (
      <div className="space-y-8">
        <CheckBox value="zz" checked={checked1} onCheckedChange={setChecked1} />
        <CheckBox size="md" value="zzzzvd" checked={checked2} onCheckedChange={setChecked2} />
      </div>
    )
  },
}
