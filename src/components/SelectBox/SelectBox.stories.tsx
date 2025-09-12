import { Meta, StoryObj } from '@storybook/react'
import { SelectBox } from './SelectBox'

const meta: Meta<typeof SelectBox> = {
  title: 'Components/SelectBox',
  component: SelectBox,
}

export default meta

type Story = StoryObj<typeof SelectBox>

export const Default: Story = {
  args: {},
}
