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
  const yellowColors = [
    { name: 'yellow-50', hex: '#fcf6df', class: 'bg-yellow-50' },
    { name: 'yellow-100', hex: '#c9bf91', class: 'bg-yellow-100' },
    { name: 'yellow-200', hex: '#fde68a', class: 'bg-yellow-200' },
    { name: 'yellow-300', hex: '#eccb43', class: 'bg-yellow-300' },
    { name: 'yellow-400', hex: '#e9be11', class: 'bg-yellow-400' },
  ]

  const navyColors = [
    { name: 'navy-50', rgb: 'rgb(77, 89, 109)', class: 'bg-navy-50' },
    { name: 'navy-100', rgb: 'rgb(52, 58, 70)', class: 'bg-navy-100' },
    { name: 'navy-200', rgb: 'rgb(32, 36, 45)', class: 'bg-navy-200' },
    { name: 'navy-300', rgb: 'rgb(42, 48, 60)', class: 'bg-navy-300' },
    { name: 'navy-400', rgb: 'rgb(25, 25, 31)', class: 'bg-navy-400' },
  ]

  return (
    <div className="p-8">
      <h2 className="text-yds-h2 mb-6 text-white">Yellow</h2>
      <div className="mb-12 flex gap-4">
        {yellowColors.map(color => (
          <div key={color.name} className="flex flex-col items-center gap-2">
            <div className={`${color.class} h-24 w-24 rounded-lg border-2 border-white`} />
            <div className="text-yds-b1 text-center text-white">
              <div className="">{color.name}</div>
              <div className="text-yds-c1m text-gray-400">{color.hex}</div>
            </div>
          </div>
        ))}
      </div>

      <h2 className="text-yds-h2 mb-6 text-white">Navy</h2>
      <div className="flex gap-4">
        {navyColors.map(color => (
          <div key={color.name} className="flex flex-col items-center gap-2">
            <div className={`${color.class} h-24 w-24 rounded-lg border-2 border-white`} />
            <div className="text-yds-b1 text-center text-white">
              <div className="">{color.name}</div>
              <div className="text-yds-c1m text-gray-400">{color.rgb}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export const AllColors: StoryObj = {
  render: () => <ColorPalette />,
}
