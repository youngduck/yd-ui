import { Meta, StoryObj } from '@storybook/react'
import Toast from './Toast'
import { OverlayProvider } from '../OverlayProvider'
import { Button } from '../../Button/Button'
import { useOverlay } from '../useOverlay'
import { copyCodeToClipboard } from '../../../storybook/utils'

const copyCode = (type: 'basic' | 'duration') => {
  const codes: Record<string, string> = {
    basic: `import { useOverlay } from '@youngduck/yd-ui/Overlays';
import { Button } from '@youngduck/yd-ui';

function Example() {
  const { toast } = useOverlay();

  return (
    <Button
      onClick={() =>
        toast({
          content: '토스트 메시지',
        })
      }
    >
      토스트 열기
    </Button>
  );
}`,
    duration: `import { useOverlay } from '@youngduck/yd-ui/Overlays';
import { Button } from '@youngduck/yd-ui';

function Example() {
  const { toast } = useOverlay();

  return (
    <Button
      onClick={() =>
        toast({
          content: '5초 동안 표시되는 토스트',
          duration: 5000,
        })
      }
    >
      토스트 열기 (5초)
    </Button>
  );
}`,
  }
  copyCodeToClipboard(codes[type])
}

const ToastPlayground = () => {
  const { toast } = useOverlay()
  return (
    <div className="flex h-[500px] w-[800px] items-center justify-center">
      <Button
        size="lg"
        variant="fill"
        color="primary"
        onClick={() => {
          toast({
            content: '토스트 메시지',
          })
        }}
      >
        토스트 열기
      </Button>
    </div>
  )
}

const meta: Meta<typeof Toast> = {
  title: 'Components/Overlay/Toast',
  component: ToastPlayground,
  decorators: [
    Story => (
      <OverlayProvider>
        <Story />
      </OverlayProvider>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component: `
YD-UI 디자인 시스템의 토스트 컴포넌트입니다.

## 주요 특징
- Context 기반 오버레이 관리 (OverlayProvider + useOverlay)
- 명령형 API로 토스트 표시 (\`toast\`)
- 자동 dismiss (기본 2초, duration 커스텀 가능)
- 스크린리더 자동 알림 (aria-live="polite")
- 토스트 스택 지원

## 사용 가이드
- 앱 최상단에 \`<OverlayProvider>\`를 감싸야 합니다.
- \`useOverlay()\` 훅으로 \`toast\`를 호출하여 토스트를 표시합니다.
- \`duration\` 옵션으로 표시 시간을 조절할 수 있습니다 (기본값: 2000ms).
        `,
      },
    },
  },
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Toast>

export const Default: Story = {}

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
          <h1 className="text-yds-h1 mb-2 text-white">Toast Examples</h1>
          <p className="text-yds-b2 mb-8 text-gray-300">
            각 예시의 &quot;소스코드 복사하기&quot; 버튼을 클릭하면 사용 코드가 클립보드에 복사됩니다.
          </p>

          {/* 기본 토스트 */}
          <div className="bg-background-secondary mb-8 rounded-lg p-8">
            <h2 className="text-yds-s1 mb-4 text-white">Basic Toast (기본)</h2>
            <p className="text-yds-c1m mb-6 text-gray-300">기본 토스트는 2초 후 자동으로 사라집니다.</p>
            <ToastBasicDemo />
          </div>

          {/* duration 커스텀 */}
          <div className="bg-background-secondary mb-8 rounded-lg p-8">
            <h2 className="text-yds-s1 mb-4 text-white">Custom Duration (표시 시간 설정)</h2>
            <p className="text-yds-c1m mb-6 text-gray-300">duration 옵션으로 토스트 표시 시간을 조절할 수 있습니다.</p>
            <ToastDurationDemo />
          </div>
        </div>
      </div>
    )
  },
}

/** 기본 토스트 데모 */
const ToastBasicDemo = () => {
  const { toast } = useOverlay()

  return (
    <div className="flex items-center gap-4">
      <Button size="lg" variant="fill" color="primary" onClick={() => toast({ content: '기본 토스트 메시지입니다.' })}>
        토스트 열기
      </Button>
      <Button size="lg" variant="outlined" color="primary" onClick={() => copyCode('basic')}>
        소스코드 복사하기
      </Button>
    </div>
  )
}

/** duration 커스텀 데모 */
const ToastDurationDemo = () => {
  const { toast } = useOverlay()

  return (
    <div className="flex flex-col gap-4">
      {([1000, 2000, 5000] as const).map(duration => (
        <div key={duration} className="flex items-center gap-4">
          <Button
            size="lg"
            variant="fill"
            color="primary"
            onClick={() =>
              toast({
                content: `${duration / 1000}초 동안 표시되는 토스트`,
                duration,
              })
            }
          >
            토스트 ({duration / 1000}초)
          </Button>
          <Button size="lg" variant="outlined" color="primary" onClick={() => copyCode('duration')}>
            소스코드 복사하기
          </Button>
        </div>
      ))}
    </div>
  )
}

