# ConfirmDialog

확인 다이얼로그 컴포넌트는 사용자에게 확인/취소 선택을 요청하는 오버레이입니다. `window.confirm`을 대체합니다.

## 기본 사용법

```tsx
import { useOverlay } from '@youngduck/yd-ui/Overlays'
import { Button } from '@youngduck/yd-ui'

function App() {
  const { confirmDialog } = useOverlay()

  return (
    <Button
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
  )
}
```

## Description 포함

제목 아래에 부가 설명을 추가할 수 있습니다.

```tsx
confirmDialog({
  title: '회원탈퇴',
  description: '모든 데이터가 삭제되며 복구할 수 없습니다.',
  onConfirm: () => {
    console.log('탈퇴 완료')
  },
})
```

## 버튼 텍스트 커스텀

`confirmText`, `cancelText`로 버튼 텍스트를 변경할 수 있습니다.

```tsx
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
```

## 비동기 onConfirm

`onConfirm`에 async 함수를 전달할 수 있습니다.

```tsx
confirmDialog({
  title: '삭제하시겠습니까?',
  onConfirm: async () => {
    await deleteItem(id)
  },
})
```

## 키보드 및 포커스 관리

- **ESC** — 다이얼로그 닫기 (취소 처리)
- **Tab / Shift+Tab** — 다이얼로그 내부에서만 포커스 순환 (포커스 트랩)
- 열릴 때 첫 번째 포커스 가능 요소에 자동 포커스
- 닫힐 때 이전 포커스 위치로 자동 복귀

## 접근성

- `role="alertdialog"`, `aria-modal="true"` 적용
- `aria-labelledby`로 제목 연결
- `aria-describedby`로 설명 연결 (description이 있을 때)

## API

### confirmDialog 옵션

| 옵션 | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| `title` | `string` | - | 다이얼로그 제목 (필수) |
| `description` | `ReactNode` | - | 부가 설명 |
| `confirmText` | `string` | `'확인'` | 확인 버튼 텍스트 |
| `cancelText` | `string` | `'취소'` | 취소 버튼 텍스트 |
| `onConfirm` | `() => void \| Promise<void>` | - | 확인 시 콜백 (필수) |
| `onCancel` | `() => void` | - | 취소 시 콜백 |

## 사전 조건

앱 최상단에 `<OverlayProvider>`가 감싸져 있어야 합니다.

```tsx
import { OverlayProvider } from '@youngduck/yd-ui/Overlays'

function App() {
  return (
    <OverlayProvider>
      <MyApp />
    </OverlayProvider>
  )
}
```

## 디자인 토큰

| 토큰 | 기본값 | 설명 |
|------|--------|------|
| `--confirm-dialog-width` | `360px` | 다이얼로그 너비 |
| `--confirm-dialog-max-width` | `90vw` | 최대 너비 |
| `--confirm-dialog-padding` | `24px` | 내부 여백 |
| `--confirm-dialog-gap` | `12px` | 요소 간 간격 |
| `--z-index-confirm-dialog-backdrop` | `1300` | 백드롭 z-index |
| `--z-index-confirm-dialog` | `1310` | 다이얼로그 z-index |
