import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'

const meta: Meta = {
  title: 'Foundations/Spacing',
  parameters: {
    layout: 'padded',
  },
}

export default meta

const spacingScale = [
  { name: 'spacing-1', px: 4 },
  { name: 'spacing-2', px: 8 },
  { name: 'spacing-3', px: 12 },
  { name: 'spacing-4', px: 16 },
  { name: 'spacing-5', px: 20 },
  { name: 'spacing-6', px: 24 },
  { name: 'spacing-8', px: 32 },
  { name: 'spacing-10', px: 40 },
  { name: 'spacing-12', px: 48 },
]

const semanticSpacings = [
  { name: 'stack-gap-sm', base: 'spacing-2', px: 8, usage: 'Stack gap="sm" — 밀접한 요소 사이' },
  { name: 'stack-gap-md', base: 'spacing-4', px: 16, usage: 'Stack gap="md" — 기본 수직 간격' },
  { name: 'stack-gap-lg', base: 'spacing-6', px: 24, usage: 'Stack gap="lg" — 폼 필드·섹션 사이' },
  { name: 'inline-gap-sm', base: 'spacing-1', px: 4, usage: 'Inline gap="sm" — 아이콘+텍스트' },
  { name: 'inline-gap-md', base: 'spacing-2', px: 8, usage: 'Inline gap="md" — 기본 수평 간격' },
  { name: 'inline-gap-lg', base: 'spacing-4', px: 16, usage: 'Inline gap="lg" — 버튼 그룹·필터 바' },
  { name: 'field-gap', base: 'spacing-2', px: 8, usage: 'Field 라벨·입력·메시지 사이' },
]

const SpacingShowcase: React.FC = () => {
  return (
    <div className="space-y-10 p-8">
      <div>
        <div className="mb-1 text-yds-s1 text-white">Spacing Scale</div>
        <p className="mb-4 text-yds-c1m text-gray-400">
          4px 단위 원시 스케일입니다. 컴포넌트 사이 간격은 이 스케일에서만 선택합니다.
        </p>
        <div className="space-y-3">
          {spacingScale.map(item => (
            <div key={item.name} className="flex items-center gap-6">
              <div className="w-28 shrink-0">
                <code className="text-yds-b2 text-yellow-300">--{item.name}</code>
              </div>
              <div className="w-12 shrink-0 text-yds-c1m text-gray-400">{item.px}px</div>
              <div className="bg-primary-400 h-4 rounded-sm" style={{ width: item.px * 4 }} />
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="mb-1 text-yds-s1 text-white">Semantic Spacing</div>
        <p className="mb-4 text-yds-c1m text-gray-400">
          용도별 시맨틱 토큰과 스케일 매핑입니다. Stack / Inline / Field 컴포넌트가 소비합니다.
        </p>
        <div className="space-y-3">
          {semanticSpacings.map(item => (
            <div key={item.name} className="flex items-center gap-6">
              <div className="w-36 shrink-0">
                <code className="text-yds-b2 text-yellow-300">--{item.name}</code>
              </div>
              <div className="w-28 shrink-0 text-yds-c1m text-gray-400">
                {item.base} ({item.px}px)
              </div>
              <div className="bg-primary-100 h-4 shrink-0 rounded-sm" style={{ width: item.px * 4 }} />
              <div className="text-yds-c1m text-gray-400">{item.usage}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export const AllSpacings: StoryObj = {
  render: () => <SpacingShowcase />,
}
