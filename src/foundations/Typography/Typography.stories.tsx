import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'

const meta: Meta = {
  title: 'Foundations/Typography',
  parameters: {
    layout: 'padded',
  },
}

export default meta

const TypographyShowcase: React.FC = () => {
  return (
    <div className="bg-background-primary w-[1200px] p-8">
      {/* Heading */}
      <div className="mb-12">
        <h2 className="text-yds-h2 font-yds-wanted mb-6 text-white">Heading</h2>
        <div className="flex flex-col gap-6">
          <div className="rounded-lg p-6">
            <div className="text-yds-h1 font-yds-wanted mb-4 text-white">
              YD Design System Typography 영덕 디자인 시스템
            </div>
            <div className="text-yds-c1r text-gray-300">
              <code className="text-yellow-400">.text-yds-h1</code> • Font: Wanted Sans Variable • Size: 48px • Line:
              58px • Weight: 600
            </div>
          </div>

          <div className="rounded-lg p-6">
            <div className="text-yds-h2 font-yds-wanted mb-4 text-white">
              YD Design System Typography 영덕 디자인 시스템
            </div>
            <div className="text-yds-c1r text-gray-300">
              <code className="text-yellow-400">.text-yds-h2</code> • Font: Wanted Sans Variable • Size: 40px • Line:
              48px • Weight: 600
            </div>
          </div>
        </div>
      </div>

      {/* Subtitle */}
      <div className="mb-12">
        <h2 className="text-yds-h2 font-yds-wanted mb-6 text-white">Subtitle</h2>
        <div className="flex flex-col gap-6">
          <div className="rounded-lg p-6">
            <div className="text-yds-s1 font-yds-wanted mb-4 text-white">
              YD Design System Typography 영덕 디자인 시스템
            </div>
            <div className="text-yds-c1r text-gray-300">
              <code className="text-yellow-400">.text-yds-s1</code> • Font: Wanted Sans Variable • Size: 24px • Line:
              30px • Weight: 600
            </div>
          </div>

          <div className="rounded-lg p-6">
            <div className="text-yds-s2 font-yds-wanted mb-4 text-white">
              YD Design System Typography 영덕 디자인 시스템
            </div>
            <div className="text-yds-c1r text-gray-300">
              <code className="text-yellow-400">.text-yds-s2</code> • Font: Wanted Sans Variable • Size: 20px • Line:
              26px • Weight: 600
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="mb-12">
        <h2 className="text-yds-h2 font-yds-wanted mb-6 text-white">Body</h2>
        <div className="flex flex-col gap-6">
          <div className="rounded-lg p-6">
            <div className="text-yds-b1 font-yds-wanted mb-4 text-white">
              YD Design System Typography 영덕 디자인 시스템
            </div>
            <div className="text-yds-c1r text-gray-300">
              <code className="text-yellow-400">.text-yds-b1</code> • Font: Wanted Sans Variable • Size: 18px • Line:
              26px • Weight: 400
            </div>
          </div>

          <div className="rounded-lg p-6">
            <div className="text-yds-b2 font-yds-wanted mb-4 text-white">
              YD Design System Typography 영덕 디자인 시스템
            </div>
            <div className="text-yds-c1r text-gray-300">
              <code className="text-yellow-400">.text-yds-b2</code> • Font: Wanted Sans Variable • Size: 16px • Line:
              24px • Weight: 400
            </div>
          </div>
        </div>
      </div>

      {/* Caption */}
      <div className="mb-12">
        <h2 className="text-yds-h2 font-yds-wanted mb-6 text-white">Caption</h2>
        <div className="flex flex-col gap-6">
          <div className="rounded-lg p-6">
            <div className="text-yds-c1m font-yds-wanted mb-4 text-white">
              YD Design System Typography 영덕 디자인 시스템
            </div>
            <div className="text-yds-c1r text-gray-300">
              <code className="text-yellow-400">.text-yds-c1m</code> • Font: Wanted Sans Variable • Size: 14px • Line:
              16px • Weight: 500
            </div>
          </div>

          <div className="rounded-lg p-6">
            <div className="text-yds-c1r font-yds-wanted mb-4 text-white">
              YD Design System Typography 영덕 디자인 시스템
            </div>
            <div className="text-yds-c1r text-gray-300">
              <code className="text-yellow-400">.text-yds-c1r</code> • Font: Wanted Sans Variable • Size: 12px • Line:
              16px • Weight: 400
            </div>
          </div>

          <div className="rounded-lg p-6">
            <div className="text-yds-c2r font-yds-wanted mb-4 text-white">
              YD Design System Typography 영덕 디자인 시스템
            </div>
            <div className="text-yds-c1r text-gray-300">
              <code className="text-yellow-400">.text-yds-c2r</code> • Font: Wanted Sans Variable • Size: 10px • Line:
              14px • Weight: 400
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export const AllTypography: StoryObj = {
  render: () => <TypographyShowcase />,
}
