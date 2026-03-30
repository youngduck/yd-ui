import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'

const meta: Meta = {
  title: 'Foundations/Colors',
  parameters: {
    layout: 'padded',
  },
}

export default meta

const ColorPalette: React.FC = () => {
  const primaryColors = [
    { name: 'primary-50', value: 'rgb(252, 246, 223)', class: 'bg-primary-50' },
    { name: 'primary-100', value: 'rgb(201, 191, 145)', class: 'bg-primary-100' },
    { name: 'primary-200', value: 'rgb(253, 230, 138)', class: 'bg-primary-200' },
    { name: 'primary-300', value: 'rgb(236, 203, 67)', class: 'bg-primary-300' },
    { name: 'primary-400', value: 'rgb(233, 190, 17)', class: 'bg-primary-400' },
  ]

  const secondaryColors = [
    { name: 'secondary-50', value: 'rgb(77, 89, 109)', class: 'bg-secondary-50' },
    { name: 'secondary-100', value: 'rgb(52, 58, 70)', class: 'bg-secondary-100' },
    { name: 'secondary-200', value: 'rgb(42, 48, 60)', class: 'bg-secondary-200' },
    { name: 'secondary-300', value: 'rgb(32, 36, 45)', class: 'bg-secondary-300' },
    { name: 'secondary-400', value: 'rgb(25, 25, 31)', class: 'bg-secondary-400' },
  ]

  return (
    <div className="space-y-8 p-8">
      {/* Primary */}
      <div>
        <div className="mb-4 text-lg font-bold text-white">Primary</div>
        <div className="flex gap-4">
          {primaryColors.map(color => (
            <div key={color.name} className="flex w-30 flex-col items-center gap-2">
              <div className={`${color.class} h-24 w-24 rounded-lg border border-gray-600`} />
              <div className="text-center">
                <div className="text-sm text-yellow-300">{color.name}</div>
                <div className="text-xs text-gray-400">{color.value}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Secondary */}
      <div>
        <div className="mb-4 text-lg font-bold text-white">Secondary</div>
        <div className="flex gap-4">
          {secondaryColors.map(color => (
            <div key={color.name} className="flex w-30 flex-col items-center gap-2">
              <div className={`${color.class} h-24 w-24 rounded-lg border border-gray-600`} />
              <div className="text-center">
                <div className="text-sm text-yellow-300">{color.name}</div>
                <div className="text-xs text-gray-400">{color.value}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export const AllColors: StoryObj = {
  render: () => <ColorPalette />,
}
