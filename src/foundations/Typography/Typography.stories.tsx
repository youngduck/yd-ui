import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'

const meta: Meta = {
  title: 'Foundations/Typography',
  parameters: {
    layout: 'padded',
  },
}

export default meta

const typographyItems = [
  { class: 'text-yds-h1', name: 'H1', size: '48px', line: '58px', weight: '600' },
  { class: 'text-yds-h2', name: 'H2', size: '40px', line: '48px', weight: '600' },
  { class: 'text-yds-s1', name: 'S1', size: '24px', line: '30px', weight: '600' },
  { class: 'text-yds-s2', name: 'S2', size: '20px', line: '26px', weight: '600' },
  { class: 'text-yds-b1', name: 'B1', size: '18px', line: '26px', weight: '600' },
  { class: 'text-yds-b2', name: 'B2', size: '16px', line: '24px', weight: '400' },
  { class: 'text-yds-c1m', name: 'C1m', size: '14px', line: '16px', weight: '500' },
  { class: 'text-yds-c1r', name: 'C1r', size: '12px', line: '16px', weight: '400' },
  { class: 'text-yds-c2r', name: 'C2r', size: '10px', line: '14px', weight: '400' },
]

const sections = [
  { title: 'Heading', items: typographyItems.filter(t => t.name.startsWith('H')) },
  { title: 'Subtitle', items: typographyItems.filter(t => t.name.startsWith('S')) },
  { title: 'Body', items: typographyItems.filter(t => t.name.startsWith('B')) },
  { title: 'Caption', items: typographyItems.filter(t => t.name.startsWith('C')) },
]

const TypographyShowcase: React.FC = () => {
  return (
    <div className="space-y-8 p-8">
      {sections.map(section => (
        <div key={section.title}>
          <div className="mb-4 text-lg font-bold text-white">{section.title}</div>
          <div className="space-y-4">
            {section.items.map(item => (
              <div key={item.name} className="flex items-baseline gap-8">
                <div className="w-16 shrink-0">
                  <div className="text-sm text-yellow-300">{item.name}</div>
                </div>
                <div className={`${item.class} flex-1 text-white`}>
                  YD Design System Typography 영덕 디자인 시스템
                </div>
                <div className="shrink-0 text-xs text-gray-400">
                  <code className="text-yellow-300">.{item.class}</code> • {item.size} / {item.line} • {item.weight}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export const AllTypography: StoryObj = {
  render: () => <TypographyShowcase />,
}
