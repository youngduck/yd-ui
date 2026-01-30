import { Meta, StoryObj } from '@storybook/react'
import { Card } from './Card'
import { copyCodeToClipboard } from '../../storybook/utils'

const copyCode = (className?: string) => {
  const classNameProp = className ? ` className="${className}"` : ''
  const code = `import { Card } from '@youngduck/yd-ui';\n\nfunction Example() {\n  return (\n    <Card${classNameProp}>\n      카드 내용\n    </Card>\n  );\n}`

  copyCodeToClipboard(code)
}

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
YD-UI 디자인 시스템의 카드 컴포넌트입니다.

## 주요 특징
- card-navy-50 스타일 고정 (디자인 토큰 기반)
- border, border-radius, padding은 디자인 토큰에서 일괄 적용
- \`className\`으로 width, height 등 Tailwind 클래스를 자유롭게 지정 가능
- children으로 자유롭게 구성 가능

## 사용 가이드
- Card는 항상 card-navy-50 스타일을 사용합니다.
- \`className\`에 Tailwind 클래스를 전달하여 크기를 조정합니다 (예: "w-64", "h-40", "max-w-md", "min-h-[200px]").
- \`children\`에 제목, 본문 등 원하는 내용을 넣어 사용합니다.
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: 'text',
      description: '카드 내용',
      table: {
        type: { summary: 'React.ReactNode' },
      },
    },
    className: {
      control: 'text',
      description: '추가 CSS 클래스',
      table: {
        type: { summary: 'string' },
      },
    },
  },
}

export default meta

type Story = StoryObj<typeof Card>

export const Default: Story = {
  render: args => (
    <Card className={args.className}>{args.children}</Card>
  ),
  args: {
    children: '카드 내용',
    className: '',
  },
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
          <h1 className="text-yds-h1 mb-2 text-white">Card Examples</h1>
          <p className="text-yds-b2 mb-8 text-gray-300">
            각 카드를 클릭하면 사용 코드가 클립보드에 복사됩니다.
          </p>

          <div className="bg-background-secondary mb-8 rounded-lg p-8">
            <h2 className="text-yds-s1 mb-4 text-white">Width & Height (크기 조정)</h2>
            <p className="text-yds-c1m mb-6 text-gray-300">
              className에 Tailwind 클래스를 전달하여 자유롭게 크기를 조정할 수 있습니다.
            </p>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { className: 'w-64', label: 'className: w-64' },
                { className: 'w-full', label: 'className: w-full' },
                { className: 'max-w-md', label: 'className: max-w-md' },
                { className: 'w-64 h-40', label: 'className: w-64 h-40' },
                { className: 'w-full min-h-[200px]', label: 'className: w-full min-h-[200px]' },
                { className: 'max-w-lg h-64', label: 'className: max-w-lg h-64' },
              ].map(({ className, label }) => (
                <div
                  key={label}
                  className="hover:bg-background-tertiary cursor-pointer rounded-lg p-2 transition-colors"
                  onClick={() => copyCode(className)}
                  onKeyDown={e => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      copyCode(className)
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  aria-label={`${label} 카드 - 클릭 시 코드 복사`}
                >
                  <Card className={className}>
                    <div className="text-yds-b2 text-white">
                      <strong>{label}</strong>
                      <p className="mt-2 text-yds-c1m">클릭하면 코드가 복사됩니다.</p>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-background-secondary mt-8 rounded-lg p-8">
            <h2 className="text-yds-s1 mb-4 text-white">커스텀 내용 예시</h2>
            <div
              className="hover:bg-background-tertiary cursor-pointer max-w-md rounded-lg p-4 transition-colors"
              onClick={() => {
                const code = `import { Card } from '@youngduck/yd-ui';\n\nfunction Example() {\n  return (\n    <Card>\n      <h3 className="text-yds-s2 text-white mb-2">카드 제목</h3>\n      <p className="text-yds-c1m text-white">자유롭게 children을 넣어 사용할 수 있습니다.</p>\n    </Card>\n  );\n}`

                copyCodeToClipboard(code)
              }}
              onKeyDown={e => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  const code = `import { Card } from '@youngduck/yd-ui';\n\nfunction Example() {\n  return (\n    <Card>\n      <h3 className="text-yds-s2 text-white mb-2">카드 제목</h3>\n      <p className="text-yds-c1m text-white">자유롭게 children을 넣어 사용할 수 있습니다.</p>\n    </Card>\n  );\n}`

                  copyCodeToClipboard(code)
                }
              }}
              role="button"
              tabIndex={0}
              aria-label="커스텀 내용 예시 - 클릭 시 코드 복사"
            >
              <Card>
                <h3 className="text-yds-s2 mb-2 text-white">카드 제목</h3>
                <p className="text-yds-c1m text-white">자유롭게 children을 넣어 사용할 수 있습니다.</p>
              </Card>
            </div>
          </div>
        </div>
      </div>
    )
  },
}
