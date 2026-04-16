import { Meta, StoryObj } from '@storybook/react'
import { HorizonDragScroll } from './HorizonDragScroll'
import { Button } from '../Button/Button'
import { copyCodeToClipboard } from '../../storybook/utils'

const meta: Meta<typeof HorizonDragScroll> = {
  title: 'Components/HorizonDragScroll',
  component: HorizonDragScroll,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
YD-UI 디자인 시스템의 가로 드래그 스크롤 컴포넌트입니다.

react-indiana-drag-scroll 오픈소스를 분석하여 함수형 컴포넌트로 재구현했습니다.

## 주요 특징
- 마우스 드래그로 가로 스크롤 가능
- 클릭과 드래그 자동 구분 (activationDistance 기반)
- 스크롤바 자동 숨김
- 이미지 위에서 드래그해도 네이티브 드래그 방지
- 드래그 후 자식 요소 클릭 차단

## 사용 가이드
- \`className\`으로 width, gap 등 레이아웃을 지정합니다.
- flex, flex-direction: row, user-select: none은 CSS에 내장되어 있습니다.
- 자식 요소에 \`shrink-0\`을 주어야 가로 스크롤이 정상 작동합니다.
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: false,
      description: '스크롤할 자식 요소들',
      table: {
        type: { summary: 'React.ReactNode' },
      },
    },
    className: {
      control: 'text',
      description: '추가 CSS 클래스 (width, gap 등)',
      table: {
        type: { summary: 'string' },
      },
    },
  },
}

export default meta

type Story = StoryObj<typeof HorizonDragScroll>

export const Default: Story = {
  render: args => (
    <div className="relative w-[500px] border-4 border-black">
      <img
        src="/logo.png"
        alt="YDS Logo"
        className="pointer-events-none absolute top-1/2 left-1/2 z-10 h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2 object-contain"
      />
      <HorizonDragScroll className={args.className}>
        {Array.from({ length: 10 }, (_, i) => (
          <div
            key={i}
            className="flex h-[150px] w-[200px] shrink-0 items-center justify-center rounded-lg bg-gray-700 text-white"
          >
            Item {i + 1}
          </div>
        ))}
      </HorizonDragScroll>
    </div>
  ),
  args: {
    className: 'gap-4',
  },
}

export const Examples = {
  parameters: {
    layout: 'fullscreen',
    docs: { disable: true },
  },
  render: () => {
    const copyCode = () => {
      copyCodeToClipboard(
        `import { HorizonDragScroll } from '@youngduck/yd-ui/HorizonDragScroll';\n\n<HorizonDragScroll className="gap-4">\n  {items.map(item => (\n    <div key={item.id} className="shrink-0">{item.name}</div>\n  ))}\n</HorizonDragScroll>`,
      )
    }

    return (
      <div className="bg-background-primary min-h-screen p-8">
        <div className="mx-auto max-w-6xl">
          <h1 className="text-yds-h1 mb-2 text-white">HorizonDragScroll Examples</h1>
          <p className="text-yds-b2 mb-8 text-gray-300">코드 복사를 클릭하면 사용 예시가 클립보드에 복사됩니다.</p>

          <div className="bg-background-secondary mb-8 rounded-lg p-8">
            <div className="relative rounded-lg border-4 border-black">
              <img
                src="/logo.png"
                alt="YDS Logo"
                className="pointer-events-none absolute top-1/2 left-1/2 z-10 h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2 object-contain"
              />
              <HorizonDragScroll className="gap-4">
                {Array.from({ length: 10 }, (_, i) => (
                  <div
                    key={i}
                    className="flex h-[150px] w-[200px] shrink-0 items-center justify-center rounded-lg bg-gray-700 text-white"
                  >
                    Item {i + 1}
                  </div>
                ))}
              </HorizonDragScroll>
            </div>
            <Button size="lg" variant="fill" onClick={() => copyCode()} className="mt-4">
              예시 코드 복사
            </Button>
          </div>
        </div>
      </div>
    )
  },
}
