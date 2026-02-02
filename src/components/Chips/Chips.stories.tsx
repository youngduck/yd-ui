import { Meta, StoryObj } from '@storybook/react'
import { Chips, type ChipsVariant, type ChipsColor } from './Chips'
import { copyCodeToClipboard } from '../../storybook/utils'

const copyCode = (variant?: ChipsVariant, color?: ChipsColor) => {
  const variantProp = variant ? ` variant="${variant}"` : ''
  const colorProp = color ? ` color="${color}"` : ''
  const code = `import { Chips } from '@youngduck/yd-ui';\n\nfunction Example() {\n  return (\n    <Chips${variantProp}${colorProp}>\n      칩 내용\n    </Chips>\n  );\n}`

  copyCodeToClipboard(code)
}

const meta: Meta<typeof Chips> = {
  title: 'Components/Chips',
  component: Chips,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
YD-UI 디자인 시스템의 칩 컴포넌트입니다.

## 주요 특징
- fill과 outlined variant 지원
- primary 색상 사용
- height는 30px로 고정 (토큰화)
- border, border-radius는 디자인 토큰에서 일괄 적용
- 좌우 패딩 12px 적용 (토큰화)
- 폰트는 yds-c1m 사용 (토큰화)
- width는 내용에 따라 자동으로 조정되는 형태 (inline-flex)

## 사용 가이드
- \`variant\` prop으로 fill 또는 outlined 선택
- \`color\` prop으로 primary 색상 사용
- height는 30px로 고정되어 있습니다.
- width는 내용에 따라 자동으로 조정됩니다.
- \`children\`에 텍스트를 넣어 사용합니다.
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      options: ['fill', 'outlined'] as ChipsVariant[],
      control: { type: 'select' },
      description: '칩 스타일 variant',
    },
    color: {
      options: ['primary'] as ChipsColor[],
      control: { type: 'select' },
      description: '칩 색상',
    },
    children: {
      control: 'text',
      description: '칩 내용',
      table: {
        type: { summary: 'React.ReactNode' },
      },
    },
  },
}

export default meta

type Story = StoryObj<typeof Chips>

export const Default: Story = {
  render: args => (
    <Chips variant={args.variant} color={args.color}>
      {args.children}
    </Chips>
  ),
  args: {
    variant: 'fill',
    color: 'primary',
    children: '칩 내용',
  },
}

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <div className="mb-2 text-lg font-bold text-white">Fill Primary</div>
        <div className="flex flex-wrap gap-4">
          <Chips variant="fill" color="primary">
            <span className="text-black">태그1</span>
          </Chips>
          <Chips variant="fill" color="primary">
            <span className="text-black">태그2</span>
          </Chips>
          <Chips variant="fill" color="primary">
            <span className="text-black">카테고리</span>
          </Chips>
        </div>
      </div>
      <div>
        <div className="mb-2 text-lg font-bold text-white">Outlined Primary</div>
        <div className="flex flex-wrap gap-4">
          <Chips variant="outlined" color="primary">
            <span className="text-primary-400">태그1</span>
          </Chips>
          <Chips variant="outlined" color="primary">
            <span className="text-primary-400">태그2</span>
          </Chips>
          <Chips variant="outlined" color="primary">
            <span className="text-primary-400">카테고리</span>
          </Chips>
        </div>
      </div>
    </div>
  ),
}

export const Examples = {
  parameters: {
    layout: 'fullscreen',
    docs: {
      disable: true,
    },
  },
  render: () => {
    return (
      <div className="bg-background-primary min-h-screen p-8">
        <div className="mx-auto max-w-6xl">
          <h1 className="text-yds-h1 mb-2 text-white">Chips Examples</h1>
          <p className="text-yds-b2 mb-8 text-gray-300">
            각 칩을 클릭하면 사용 코드가 클립보드에 복사됩니다.
          </p>

          <div className="bg-background-secondary mb-8 rounded-lg p-8">
            <h2 className="text-yds-s1 mb-4 text-white">Variants (스타일 변형)</h2>
            <p className="text-yds-c1m mb-6 text-gray-300">
              variant prop으로 fill 또는 outlined 스타일을 선택할 수 있습니다.
            </p>
            <div className="space-y-6">
              <div>
                <div className="mb-2 text-sm text-yellow-300">Fill Primary</div>
                <div className="flex flex-wrap gap-4">
                  {['태그1', '태그2', '카테고리'].map((text) => (
                    <div
                      key={text}
                      className="hover:bg-background-tertiary cursor-pointer rounded-lg p-2 transition-colors"
                      onClick={() => copyCode('fill', 'primary')}
                      onKeyDown={e => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault()
                          copyCode('fill', 'primary')
                        }
                      }}
                      role="button"
                      tabIndex={0}
                      aria-label={`${text} fill 칩 - 클릭 시 코드 복사`}
                    >
                      <Chips variant="fill" color="primary">
                        <span className="text-black">{text}</span>
                      </Chips>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <div className="mb-2 text-sm text-yellow-300">Outlined Primary</div>
                <div className="flex flex-wrap gap-4">
                  {['태그1', '태그2', '카테고리'].map((text) => (
                    <div
                      key={text}
                      className="hover:bg-background-tertiary cursor-pointer rounded-lg p-2 transition-colors"
                      onClick={() => copyCode('outlined', 'primary')}
                      onKeyDown={e => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault()
                          copyCode('outlined', 'primary')
                        }
                      }}
                      role="button"
                      tabIndex={0}
                      aria-label={`${text} outlined 칩 - 클릭 시 코드 복사`}
                    >
                      <Chips variant="outlined" color="primary">
                        <span className="text-primary-400">{text}</span>
                      </Chips>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-background-secondary mb-8 rounded-lg p-8">
            <h2 className="text-yds-s1 mb-4 text-white">텍스트 예시</h2>
            <p className="text-yds-c1m mb-6 text-gray-300">
              다양한 텍스트 길이의 칩 예시입니다.
            </p>
            <div className="flex flex-wrap gap-4">
              {[
                '짧은 텍스트',
                '조금 더 긴 텍스트',
                '매우 긴 텍스트가 들어가는 칩 예시입니다',
                '태그',
                '카테고리',
              ].map((text) => (
                <div
                  key={text}
                  className="hover:bg-background-tertiary cursor-pointer rounded-lg p-2 transition-colors"
                  onClick={() => {
                    const code = `import { Chips } from '@youngduck/yd-ui';\n\nfunction Example() {\n  return (\n    <Chips variant="fill" color="primary">\n      <span className="text-black">${text}</span>\n    </Chips>\n  );\n}`
                    copyCodeToClipboard(code)
                  }}
                  onKeyDown={e => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      const code = `import { Chips } from '@youngduck/yd-ui';\n\nfunction Example() {\n  return (\n    <Chips variant="fill" color="primary">\n      <span className="text-black">${text}</span>\n    </Chips>\n  );\n}`
                      copyCodeToClipboard(code)
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  aria-label={`${text} 칩 - 클릭 시 코드 복사`}
                >
                  <Chips variant="fill" color="primary">
                    <span className="text-black">{text}</span>
                  </Chips>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-background-secondary mb-8 rounded-lg p-8">
            <h2 className="text-yds-s1 mb-4 text-white">여러 칩 조합</h2>
            <p className="text-yds-c1m mb-6 text-gray-300">
              여러 칩을 함께 사용하는 예시입니다.
            </p>
            <div className="space-y-6">
              <div>
                <div className="mb-2 text-sm text-yellow-300">Fill Primary 조합</div>
                <div
                  className="hover:bg-background-tertiary cursor-pointer rounded-lg p-4 transition-colors"
                  onClick={() => {
                    const code = `import { Chips } from '@youngduck/yd-ui';\n\nfunction Example() {\n  return (\n    <div className="flex flex-wrap gap-2">\n      <Chips variant="fill" color="primary"><span className="text-black">태그1</span></Chips>\n      <Chips variant="fill" color="primary"><span className="text-black">태그2</span></Chips>\n      <Chips variant="fill" color="primary"><span className="text-black">태그3</span></Chips>\n    </div>\n  );\n}`
                    copyCodeToClipboard(code)
                  }}
                  onKeyDown={e => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      const code = `import { Chips } from '@youngduck/yd-ui';\n\nfunction Example() {\n  return (\n    <div className="flex flex-wrap gap-2">\n      <Chips variant="fill" color="primary"><span className="text-black">태그1</span></Chips>\n      <Chips variant="fill" color="primary"><span className="text-black">태그2</span></Chips>\n      <Chips variant="fill" color="primary"><span className="text-black">태그3</span></Chips>\n    </div>\n  );\n}`
                      copyCodeToClipboard(code)
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  aria-label="Fill Primary 여러 칩 조합 예시 - 클릭 시 코드 복사"
                >
                  <div className="flex flex-wrap gap-2">
                    <Chips variant="fill" color="primary">
                      <span className="text-black">태그1</span>
                    </Chips>
                    <Chips variant="fill" color="primary">
                      <span className="text-black">태그2</span>
                    </Chips>
                    <Chips variant="fill" color="primary">
                      <span className="text-black">태그3</span>
                    </Chips>
                    <Chips variant="fill" color="primary">
                      <span className="text-black">카테고리</span>
                    </Chips>
                    <Chips variant="fill" color="primary">
                      <span className="text-black">필터</span>
                    </Chips>
                  </div>
                </div>
              </div>
              <div>
                <div className="mb-2 text-sm text-yellow-300">Outlined Primary 조합</div>
                <div
                  className="hover:bg-background-tertiary cursor-pointer rounded-lg p-4 transition-colors"
                  onClick={() => {
                    const code = `import { Chips } from '@youngduck/yd-ui';\n\nfunction Example() {\n  return (\n    <div className="flex flex-wrap gap-2">\n      <Chips variant="outlined" color="primary"><span className="text-primary-400">태그1</span></Chips>\n      <Chips variant="outlined" color="primary"><span className="text-primary-400">태그2</span></Chips>\n      <Chips variant="outlined" color="primary"><span className="text-primary-400">태그3</span></Chips>\n    </div>\n  );\n}`
                    copyCodeToClipboard(code)
                  }}
                  onKeyDown={e => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      const code = `import { Chips } from '@youngduck/yd-ui';\n\nfunction Example() {\n  return (\n    <div className="flex flex-wrap gap-2">\n      <Chips variant="outlined" color="primary"><span className="text-primary-400">태그1</span></Chips>\n      <Chips variant="outlined" color="primary"><span className="text-primary-400">태그2</span></Chips>\n      <Chips variant="outlined" color="primary"><span className="text-primary-400">태그3</span></Chips>\n    </div>\n  );\n}`
                      copyCodeToClipboard(code)
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  aria-label="Outlined Primary 여러 칩 조합 예시 - 클릭 시 코드 복사"
                >
                  <div className="flex flex-wrap gap-2">
                    <Chips variant="outlined" color="primary">
                      <span className="text-primary-400">태그1</span>
                    </Chips>
                    <Chips variant="outlined" color="primary">
                      <span className="text-primary-400">태그2</span>
                    </Chips>
                    <Chips variant="outlined" color="primary">
                      <span className="text-primary-400">태그3</span>
                    </Chips>
                    <Chips variant="outlined" color="primary">
                      <span className="text-primary-400">카테고리</span>
                    </Chips>
                    <Chips variant="outlined" color="primary">
                      <span className="text-primary-400">필터</span>
                    </Chips>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  },
}
