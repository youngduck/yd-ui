import { Meta, StoryObj } from '@storybook/react'
import { Button, type ButtonSize, type ButtonVariant, type ButtonColor } from './Button'

const meta: Meta<typeof Button> = {
  component: Button,
  argTypes: {
    size: {
      options: ['sm', 'md', 'lg', 'full'] as ButtonSize[],
      control: { type: 'select' },
    },
    variant: {
      options: ['fill', 'outlined'] as ButtonVariant[],
      control: { type: 'select' },
    },
    color: {
      options: ['primary'] as ButtonColor[],
      control: { type: 'select' },
    },
  },
}

export default meta

type Story = StoryObj<typeof Button>

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-8">
      {/* Fixed width buttons */}
      {(['sm', 'md', 'lg'] as ButtonSize[]).map(size => (
        <div key={size}>
          <div className="mb-2 font-bold text-lg capitalize text-white">{size}</div>
          <div className="flex gap-8">
            {/* Fill */}
            <div>
              <div className="mb-1 text-sm text-yellow-300">Fill</div>
              <div className="flex gap-2">
                <Button size={size} variant="fill" color="primary">
                  저장
                </Button>
              </div>
            </div>
            {/* Outlined */}
            <div>
              <div className="mb-1 text-sm text-yellow-300">Outlined</div>
              <div className="flex gap-2">
                <Button size={size} variant="outlined" color="primary">
                  저장
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Full width buttons */}
      <div>
        <div className="mb-2 font-bold text-lg capitalize text-white">full</div>
        <div className="max-w-2xl border border-gray-600 rounded-lg p-4">
          <div className="flex gap-8">
            {/* Fill */}
            <div className="flex-1">
              <div className="mb-1 text-sm text-yellow-300">Fill</div>
              <div className="flex gap-2">
                <Button size="full" variant="fill" color="primary">
                  저장
                </Button>
              </div>
            </div>
            {/* Outlined */}
            <div className="flex-1">
              <div className="mb-1 text-sm text-yellow-300">Outlined</div>
              <div className="flex gap-2">
                <Button size="full" variant="outlined" color="primary">
                  저장
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
}
