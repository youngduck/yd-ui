import { Meta, StoryObj } from '@storybook/react'
import { OverlayProvider } from '../OverlayProvider'
import { useOverlay } from '../useOverlay'
import { Button } from '../../Button/Button'
import { copyCodeToClipboard } from '../../../storybook/utils'

const copyCode = (type: 'static' | 'function', size: string = 'md') => {
  const codes: Record<string, string> = {
    static: `import { useOverlay } from '@youngduck/yd-ui/Overlays';\nimport { Button } from '@youngduck/yd-ui';\n\nfunction Example() {\n  const { modalOpen } = useOverlay();\n\n  return (\n    <Button\n      onClick={() =>\n        modalOpen({\n          config: { size: '${size}' },\n          content: (\n            <div>\n              <h2>모달 제목</h2>\n              <p>모달 내용</p>\n            </div>\n          ),\n        })\n      }\n    >\n      모달 열기\n    </Button>\n  );\n}`,
    function: `import { useOverlay } from '@youngduck/yd-ui/Overlays';\nimport { Button } from '@youngduck/yd-ui';\n\nfunction Example() {\n  const { modalOpen } = useOverlay();\n\n  return (\n    <Button\n      onClick={() =>\n        modalOpen({\n          config: { size: '${size}' },\n          content: (onClose) => (\n            <div>\n              <h2>모달 제목</h2>\n              <p>onClose 콜백으로 내부에서 닫기 가능</p>\n              <Button onClick={onClose}>닫기</Button>\n            </div>\n          ),\n        })\n      }\n    >\n      모달 열기\n    </Button>\n  );\n}`,
  }
  copyCodeToClipboard(codes[type])
}

// useOverlay는 OverlayProvider 내부에서만 사용 가능하므로 별도 컴포넌트 필요
const ModalPlayground = () => {
  const { modalOpen } = useOverlay()

  return (
    <div className='w-[800px] h-[500px] flex items-center justify-center'>
    <Button
      size="lg"
      variant="fill"
      color="primary"
      onClick={() =>
        modalOpen({
          config: { size: 'sm' },
          content: onClose => (
            <div className="flex flex-col gap-4 p-4 items-stretch justify-around">
              <h2 className="text-yds-s1 text-white">모달 제목</h2>
              <p className="text-yds-b2 text-gray-300">배경을 클릭하거나 닫기 버튼으로 닫을 수 있습니다.</p>
              <div className="flex justify-center">
                <Button size="lg" variant="outlined" color="primary" onClick={onClose}>
                  닫기
                </Button>
              </div>
            </div>
          ),
        })
      }
    >
      모달 열기
    </Button>
    </div>
  )
}

const meta: Meta = {
  title: 'Components/Overlay/Modal',
  component: ModalPlayground,
  decorators: [
    Story => (
      <OverlayProvider>
        <Story />
      </OverlayProvider>
    ),
  ],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
YD-UI 디자인 시스템의 모달 컴포넌트입니다.

## 주요 특징
- Context 기반 오버레이 관리 (OverlayProvider + useOverlay)
- 명령형 API로 모달 열기/닫기 (\`modalOpen\`, \`modalClose\`)
- 정적 content와 함수형 content(onClose 콜백) 모두 지원
- 배경 클릭 시 닫기 지원
- sm / md / lg / xl 사이즈 지원

## 사용 가이드
- 앱 최상단에 \`<OverlayProvider>\`를 감싸야 합니다.
- \`useOverlay()\` 훅으로 \`modalOpen\`을 호출하여 모달을 엽니다.
- content에 함수를 전달하면 \`onClose\` 콜백을 받아 내부에서 닫기 처리가 가능합니다.
        `,
      },
    },
  },
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj

export const Default: Story = {
  render: () => <ModalPlayground />,
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
          <h1 className="text-yds-h1 mb-2 text-white">Modal Examples</h1>
          <p className="text-yds-b2 mb-8 text-gray-300">
            각 예시의 &quot;소스코드 복사하기&quot; 버튼을 클릭하면 사용 코드가 클립보드에 복사됩니다.
          </p>

          {/* 사이즈별 모달 */}
          <div className="bg-background-secondary mb-8 rounded-lg p-8">
            <h2 className="text-yds-s1 mb-4 text-white">Modal Sizes (사이즈 변형)</h2>
            <p className="text-yds-c1m mb-6 text-gray-300">
              config.size prop으로 sm / md / lg / xl 사이즈를 선택할 수 있습니다.
            </p>
            <ModalSizesDemo />
          </div>

          {/* 함수형 content */}
          <div className="bg-background-secondary mb-8 rounded-lg p-8">
            <h2 className="text-yds-s1 mb-4 text-white">함수형 Content (onClose 콜백)</h2>
            <p className="text-yds-c1m mb-6 text-gray-300">
              content에 함수를 전달하면 onClose 콜백을 받아 내부 버튼으로 닫기 처리가 가능합니다.
            </p>
            <ModalFunctionDemo />
          </div>
        </div>
      </div>
    )
  },
}

/** 사이즈별 모달 데모 */
const ModalSizesDemo = () => {
  const { modalOpen } = useOverlay()

  return (
    <div className="flex flex-col gap-4">
      {(['sm', 'md', 'lg', 'xl'] as const).map(size => (
        <div key={size} className="flex items-center gap-4">
          <Button
            size="lg"
            variant="fill"
            color="primary"
            onClick={() =>
              modalOpen({
                config: { size },
                content: (
                  <div className="flex flex-col gap-4 p-4">
                    <h2 className="text-yds-s1 text-white">모달 사이즈: {size}</h2>
                    <p className="text-yds-b2 text-gray-300">
                      사이즈: {size} — 배경을 클릭하면 닫힙니다.
                    </p>
                  </div>
                ),
              })
            }
          >
            모달 사이즈: {size}
          </Button>
          <Button
            size="lg"
            variant="outlined"
            color="primary"
            onClick={() => copyCode('static', size)}
          >
            소스코드 복사하기
          </Button>
        </div>
      ))}
    </div>
  )
}

/** 함수형 content 데모 */
const ModalFunctionDemo = () => {
  const { modalOpen } = useOverlay()

  return (
    <div className="flex items-center gap-4">
      <Button
        size="lg"
        variant="outlined"
        color="primary"
        onClick={() =>
          modalOpen({
            config: { size: 'md' },
            content: onClose => (
              <div className="flex flex-col gap-4 p-4">
                <h2 className="text-yds-s1 text-white">함수형 모달</h2>
                <p className="text-yds-b2 text-gray-300">
                  onClose 콜백을 받아서 내부 버튼으로 닫을 수 있습니다.
                </p>
                <div className="flex justify-end gap-2">
                  <Button size="lg" variant="outlined" color="primary" onClick={onClose}>
                    닫기
                  </Button>
                  <Button
                    size="lg"
                    variant="fill"
                    color="primary"
                    onClick={() => {
                      onClose()
                    }}
                  >
                    확인
                  </Button>
                </div>
              </div>
            ),
          })
        }
      >
        모달 열기
      </Button>
      <Button
        size="lg"
        variant="outlined"
        color="primary"
        onClick={() => copyCode('function')}
      >
        소스코드 복사하기
      </Button>
    </div>
  )
}

