import { Meta, StoryObj } from '@storybook/react'
import { Input, type InputSize, type InputColor, type InputVariant } from './Input'

const meta: Meta<typeof Input> = {
  component: Input,
  argTypes: {
    size: {
      options: ['sm', 'md', 'lg', 'full'] as InputSize[],
      control: { type: 'select' },
    },
    color: {
      options: ['white', 'primary-400', 'primary-100'] as InputColor[],
      control: { type: 'select' },
    },
    variant: {
      options: ['search', 'input'] as InputVariant[],
      control: { type: 'select' },
    },
    disabled: {
      control: { type: 'boolean' },
    },
  },
}

export default meta

type Story = StoryObj<typeof Input>

export const Default: Story = {
  args: {
    placeholder: '입력...',
  },
}

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-8 p-8">
      {/* Size variants */}
      {(['sm', 'md', 'lg'] as const).map(size => (
        <div key={size}>
          <div className="mb-4 font-bold text-lg capitalize text-white">{size}</div>
          <div className="grid grid-cols-2 gap-8">
            {/* Search variants */}
            <div>
              <div className="mb-2 text-sm text-yellow-300">Search</div>
              <div className="space-y-4">
                <Input size={size} variant="search" color="primary-400" placeholder="검색..." />
                <Input size={size} variant="search" color="primary-100" placeholder="검색..." />
                <Input size={size} variant="search" color="white" placeholder="검색..." />
              </div>
            </div>
            {/* Input variants */}
            <div>
              <div className="mb-2 text-sm text-yellow-300">Input</div>
              <div className="space-y-4">
                <Input size={size} variant="input" color="primary-400" placeholder="입력..." />
                <Input size={size} variant="input" color="primary-100" placeholder="입력..." />
                <Input size={size} variant="input" color="white" placeholder="입력..." />
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Full width variants */}
      <div>
        <div className="mb-4 font-bold text-lg capitalize text-white">full</div>
        <div className="max-w-4xl border border-gray-600 rounded-lg p-6">
          <div className="grid grid-cols-2 gap-8">
            {/* Search variants */}
            <div>
              <div className="mb-2 text-sm text-yellow-300">Search</div>
              <div className="space-y-4">
                <Input size="full" variant="search" color="primary-400" placeholder="검색..." />
                <Input size="full" variant="search" color="primary-100" placeholder="검색..." />
                <Input size="full" variant="search" color="white" placeholder="검색..." />
              </div>
            </div>
            {/* Input variants */}
            <div>
              <div className="mb-2 text-sm text-yellow-300">Input</div>
              <div className="space-y-4">
                <Input size="full" variant="input" color="primary-400" placeholder="입력..." />
                <Input size="full" variant="input" color="primary-100" placeholder="입력..." />
                <Input size="full" variant="input" color="white" placeholder="입력..." />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Disabled state */}
      <div>
        <div className="mb-4 font-bold text-lg capitalize text-white">Disabled</div>
        <div className="grid grid-cols-2 gap-8">
          <div>
            <div className="mb-2 text-sm text-yellow-300">Search (Disabled)</div>
            <Input size="md" variant="search" color="primary-400" placeholder="검색..." disabled />
          </div>
          <div>
            <div className="mb-2 text-sm text-yellow-300">Input (Disabled)</div>
            <Input size="md" variant="input" color="primary-400" placeholder="입력..." disabled />
          </div>
        </div>
      </div>

      {/* Usage examples */}
      <div>
        <div className="mb-4 font-bold text-lg capitalize text-white">사용 예시</div>
        <div className="space-y-4 max-w-md">
          <div>
            <label className="block text-sm text-white mb-2">닉네임</label>
            <Input variant="search" color="primary-400" placeholder="검색..." />
          </div>
          <div>
            <label className="block text-sm text-white mb-2">닉네임</label>
            <Input variant="input" color="white" placeholder="검색..." />
          </div>
        </div>
      </div>
    </div>
  ),
}
