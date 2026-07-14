import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'

const meta: Meta = {
  title: 'Foundations/Border',
  parameters: {
    layout: 'padded',
  },
}

export default meta

const borderColors = [
  { name: 'border-primary-light', base: 'primary-100', varName: '--color-border-primary-light', usage: 'Input·Calendar 트리거 등 밝은 강조 테두리' },
  { name: 'border-primary-deep', base: 'primary-400', varName: '--color-border-primary-deep', usage: 'Button outlined 등 진한 강조 테두리' },
  { name: 'border-secondary-light', base: 'secondary-50', varName: '--color-border-secondary-light', usage: 'Card outlined 등 면 구분 테두리' },
  { name: 'border-secondary-deep', base: 'secondary-400', varName: '--color-border-secondary-deep', usage: '어두운 면 구분 테두리' },
  { name: 'border-divider', base: 'secondary-100', varName: '--color-border-divider', usage: 'Table 행 구분선 · Tabs 컨테이너 테두리' },
]

const BorderShowcase: React.FC = () => {
  return (
    <div className="space-y-10 p-8">
      <div>
        <div className="mb-1 text-yds-s2 text-white">Border Width & Radius</div>
        <p className="mb-4 text-yds-c1r text-gray-400">모든 컴포넌트가 공유하는 기본 테두리 두께와 모서리 반경입니다.</p>
        <div className="flex gap-8">
          <div className="flex flex-col items-center gap-2">
            <div
              className="h-24 w-24"
              style={{ border: 'var(--yds-border-width) solid var(--color-primary-400)' }}
            />
            <code className="text-yds-c1m text-yellow-300">--yds-border-width</code>
            <span className="text-yds-c1r text-gray-400">2px</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div
              className="h-24 w-24"
              style={{
                border: 'var(--yds-border-width) solid var(--color-primary-400)',
                borderRadius: 'var(--yds-border-radius)',
              }}
            />
            <code className="text-yds-c1m text-yellow-300">--yds-border-radius</code>
            <span className="text-yds-c1r text-gray-400">8px</span>
          </div>
        </div>
      </div>

      <div>
        <div className="mb-1 text-yds-s2 text-white">Border Colors</div>
        <p className="mb-4 text-yds-c1r text-gray-400">
          시맨틱 테두리 색상 토큰입니다. 컴포넌트는 원시 색상 대신 이 계층을 참조합니다.
        </p>
        <div className="space-y-4">
          {borderColors.map(item => (
            <div key={item.name} className="flex items-center gap-6">
              <div className="w-52 shrink-0">
                <code className="text-yds-c1m text-yellow-300">{item.varName}</code>
              </div>
              <div className="w-28 shrink-0 text-yds-c1r text-gray-400">{item.base}</div>
              <div
                className="bg-background-secondary h-12 w-40 shrink-0"
                style={{
                  border: `var(--yds-border-width) solid var(${item.varName})`,
                  borderRadius: 'var(--yds-border-radius)',
                }}
              />
              <div className="text-yds-c1r text-gray-400">{item.usage}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export const AllBorders: StoryObj = {
  render: () => <BorderShowcase />,
}
