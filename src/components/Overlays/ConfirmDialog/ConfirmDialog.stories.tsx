import { Meta, StoryObj } from '@storybook/react'
import { ConfirmDialog } from './ConfirmDialog'
import { OverlayProvider } from '../OverlayProvider'
import { Button } from '../../Button/Button'
import { useOverlay } from '../useOverlay'
import { copyCodeToClipboard } from '../../../storybook/utils'

const copyCode = (type: 'basic' | 'custom' | 'description') => {
  const codes: Record<string, string> = {
    basic: `import { useOverlay } from '@youngduck/yd-ui/Overlays';
import { Button } from '@youngduck/yd-ui';

function Example() {
  const { confirmDialog } = useOverlay();

  return (
    <Button
      onClick={() =>
        confirmDialog({
          title: '삭제하시겠습니까?',
          onConfirm: () => {
            console.log('삭제 완료');
          },
        })
      }
    >
      삭제
    </Button>
  );
}`,
    description: `import { useOverlay } from '@youngduck/yd-ui/Overlays';
import { Button } from '@youngduck/yd-ui';

function Example() {
  const { confirmDialog } = useOverlay();

  return (
    <Button
      onClick={() =>
        confirmDialog({
          title: '회원탈퇴',
          description: '모든 데이터가 삭제되며 복구할 수 없습니다.',
          onConfirm: () => {
            console.log('탈퇴 완료');
          },
        })
      }
    >
      회원탈퇴
    </Button>
  );
}`,
    custom: `import { useOverlay } from '@youngduck/yd-ui/Overlays';
import { Button } from '@youngduck/yd-ui';

function Example() {
  const { confirmDialog } = useOverlay();

  return (
    <Button
      onClick={() =>
        confirmDialog({
          title: '변경사항을 저장하시겠습니까?',
          description: '저장하지 않은 변경사항은 사라집니다.',
          confirmText: '저장',
          cancelText: '돌아가기',
          onConfirm: () => {
            console.log('저장 완료');
          },
          onCancel: () => {
            console.log('취소');
          },
        })
      }
    >
      저장 확인
    </Button>
  );
}`,
  }
  copyCodeToClipboard(codes[type])
}

const ConfirmDialogPlayground = () => {
  const { confirmDialog } = useOverlay()
  return (
    <div className="flex h-[500px] w-[800px] items-center justify-center">
      <Button
        size="lg"
        variant="fill"
        color="primary"
        onClick={() =>
          confirmDialog({
            title: '삭제하시겠습니까?',
            description: '이 작업은 되돌릴 수 없습니다.',
            onConfirm: () => {
              console.log('확인')
            },
          })
        }
      >
        ConfirmDialog 열기
      </Button>
    </div>
  )
}

const meta: Meta<typeof ConfirmDialog> = {
  title: 'Components/Overlay/ConfirmDialog',
  component: ConfirmDialogPlayground,
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
YD-UI 디자인 시스템의 확인 다이얼로그 컴포넌트입니다.

## 주요 특징
- Context 기반 오버레이 관리 (OverlayProvider + useOverlay)
- 명령형 API로 확인 다이얼로그 표시 (\`confirmDialog\`)
- 확인/취소 버튼 텍스트 커스텀 가능
- 배경 클릭 또는 ESC 키로 취소 처리
- window.confirm 대체용

## 사용 가이드
- 앱 최상단에 \`<OverlayProvider>\`를 감싸야 합니다.
- \`useOverlay()\` 훅으로 \`confirmDialog\`를 호출하여 다이얼로그를 표시합니다.
- \`onConfirm\` 콜백으로 확인 시 동작을 정의합니다.
- \`confirmText\`, \`cancelText\`로 버튼 텍스트를 커스텀할 수 있습니다 (기본값: 확인/취소).
        `,
      },
    },
  },
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof ConfirmDialog>

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
          <h1 className="text-yds-h1 mb-2 text-white">ConfirmDialog Examples</h1>
          <p className="text-yds-b2 mb-8 text-gray-300">
            각 예시의 &quot;소스코드 복사하기&quot; 버튼을 클릭하면 사용 코드가 클립보드에 복사됩니다.
          </p>

          {/* 기본 확인 다이얼로그 */}
          <div className="bg-background-secondary mb-8 rounded-lg p-8">
            <h2 className="text-yds-s1 mb-4 text-white">Basic ConfirmDialog (기본)</h2>
            <p className="text-yds-c1m mb-6 text-gray-300">기본 확인/취소 다이얼로그입니다.</p>
            <ConfirmDialogBasicDemo />
          </div>

          {/* description 포함 */}
          <div className="bg-background-secondary mb-8 rounded-lg p-8">
            <h2 className="text-yds-s1 mb-4 text-white">With Description (설명 포함)</h2>
            <p className="text-yds-c1m mb-6 text-gray-300">제목 아래에 부가 설명을 추가할 수 있습니다.</p>
            <ConfirmDialogDescriptionDemo />
          </div>

          {/* 버튼 텍스트 커스텀 */}
          <div className="bg-background-secondary mb-8 rounded-lg p-8">
            <h2 className="text-yds-s1 mb-4 text-white">Custom Button Text (버튼 텍스트 커스텀)</h2>
            <p className="text-yds-c1m mb-6 text-gray-300">confirmText, cancelText로 버튼 텍스트를 변경할 수 있습니다.</p>
            <ConfirmDialogCustomDemo />
          </div>
        </div>
      </div>
    )
  },
}

/** 기본 확인 다이얼로그 데모 */
const ConfirmDialogBasicDemo = () => {
  const { confirmDialog } = useOverlay()

  return (
    <div className="flex items-center gap-4">
      <Button
        size="lg"
        variant="fill"
        color="primary"
        onClick={() =>
          confirmDialog({
            title: '삭제하시겠습니까?',
            onConfirm: () => {
              console.log('삭제 완료')
            },
          })
        }
      >
        삭제
      </Button>
      <Button size="lg" variant="outlined" color="primary" onClick={() => copyCode('basic')}>
        소스코드 복사하기
      </Button>
    </div>
  )
}

/** description 포함 데모 */
const ConfirmDialogDescriptionDemo = () => {
  const { confirmDialog } = useOverlay()

  return (
    <div className="flex items-center gap-4">
      <Button
        size="lg"
        variant="fill"
        color="primary"
        onClick={() =>
          confirmDialog({
            title: '회원탈퇴',
            description: '모든 데이터가 삭제되며 복구할 수 없습니다.',
            onConfirm: () => {
              console.log('탈퇴 완료')
            },
          })
        }
      >
        회원탈퇴
      </Button>
      <Button size="lg" variant="outlined" color="primary" onClick={() => copyCode('description')}>
        소스코드 복사하기
      </Button>
    </div>
  )
}

/** 버튼 텍스트 커스텀 데모 */
const ConfirmDialogCustomDemo = () => {
  const { confirmDialog } = useOverlay()

  return (
    <div className="flex items-center gap-4">
      <Button
        size="lg"
        variant="fill"
        color="primary"
        onClick={() =>
          confirmDialog({
            title: '변경사항을 저장하시겠습니까?',
            description: '저장하지 않은 변경사항은 사라집니다.',
            confirmText: '저장',
            cancelText: '돌아가기',
            onConfirm: () => {
              console.log('저장 완료')
            },
            onCancel: () => {
              console.log('취소')
            },
          })
        }
      >
        저장 확인
      </Button>
      <Button size="lg" variant="outlined" color="primary" onClick={() => copyCode('custom')}>
        소스코드 복사하기
      </Button>
    </div>
  )
}
