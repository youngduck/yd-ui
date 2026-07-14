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

  const greenColors = [
    { name: 'green-50', value: 'rgb(240, 253, 244)', varName: '--color-green-50' },
    { name: 'green-100', value: 'rgb(220, 252, 231)', varName: '--color-green-100' },
    { name: 'green-200', value: 'rgb(187, 247, 208)', varName: '--color-green-200' },
    { name: 'green-300', value: 'rgb(134, 239, 172)', varName: '--color-green-300' },
    { name: 'green-400', value: 'rgb(74, 222, 128)', varName: '--color-green-400' },
  ]

  const redColors = [
    { name: 'red-50', value: 'rgb(254, 242, 242)', varName: '--color-red-50' },
    { name: 'red-100', value: 'rgb(254, 226, 226)', varName: '--color-red-100' },
    { name: 'red-200', value: 'rgb(254, 202, 202)', varName: '--color-red-200' },
    { name: 'red-300', value: 'rgb(252, 165, 165)', varName: '--color-red-300' },
    { name: 'red-400', value: 'rgb(248, 113, 113)', varName: '--color-red-400' },
  ]

  return (
    <div className="space-y-8 p-8">
      {/* Primary */}
      <div>
        <div className="mb-4 text-yds-s2 text-white">Primary</div>
        <div className="flex gap-4">
          {primaryColors.map(color => (
            <div key={color.name} className="flex w-30 flex-col items-center gap-2">
              <div className={`${color.class} h-24 w-24 rounded-lg border border-gray-600`} />
              <div className="text-center">
                <div className="text-yds-c1m text-yellow-300">{color.name}</div>
                <div className="text-yds-c1r text-gray-400">{color.value}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Secondary */}
      <div>
        <div className="mb-4 text-yds-s2 text-white">Secondary</div>
        <div className="flex gap-4">
          {secondaryColors.map(color => (
            <div key={color.name} className="flex w-30 flex-col items-center gap-2">
              <div className={`${color.class} h-24 w-24 rounded-lg border border-gray-600`} />
              <div className="text-center">
                <div className="text-yds-c1m text-yellow-300">{color.name}</div>
                <div className="text-yds-c1r text-gray-400">{color.value}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Green */}
      <div>
        <div className="mb-4 text-yds-s2 text-white">Green</div>
        <div className="flex gap-4">
          {greenColors.map(color => (
            <div key={color.name} className="flex w-30 flex-col items-center gap-2">
              <div
                className="h-24 w-24 rounded-lg border border-gray-600"
                style={{ backgroundColor: `var(${color.varName})` }}
              />
              <div className="text-center">
                <div className="text-yds-c1m text-yellow-300">{color.name}</div>
                <div className="text-yds-c1r text-gray-400">{color.value}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Red */}
      <div>
        <div className="mb-4 text-yds-s2 text-white">Red</div>
        <div className="flex gap-4">
          {redColors.map(color => (
            <div key={color.name} className="flex w-30 flex-col items-center gap-2">
              <div
                className="h-24 w-24 rounded-lg border border-gray-600"
                style={{ backgroundColor: `var(${color.varName})` }}
              />
              <div className="text-center">
                <div className="text-yds-c1m text-yellow-300">{color.name}</div>
                <div className="text-yds-c1r text-gray-400">{color.value}</div>
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
