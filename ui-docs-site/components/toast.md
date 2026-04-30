# Toast

토스트 컴포넌트는 사용자에게 짧은 알림 메시지를 표시하는 오버레이입니다. `window.alert`를 대체합니다.

## 기본 사용법

```tsx
import { useOverlay } from '@youngduck/yd-ui/Overlays'
import { Button } from '@youngduck/yd-ui'

function App() {
  const { toast } = useOverlay()

  return (
    <Button
      onClick={() =>
        toast({
          content: '저장되었습니다.',
        })
      }
    >
      토스트 열기
    </Button>
  )
}
```

## Duration 커스텀

`duration` 옵션으로 토스트 표시 시간을 조절할 수 있습니다. 기본값은 2000ms입니다.

```tsx
toast({
  content: '5초 동안 표시되는 토스트',
  duration: 5000,
})
```

## API

### toast 옵션

| 옵션 | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| `content` | `ReactNode` | - | 토스트 내용 (필수) |
| `duration` | `number` | `2000` | 표시 시간 (ms) |

## 접근성

- `role="status"`, `aria-live="polite"` 적용
- 스크린리더가 토스트 메시지를 자동으로 읽어줌

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
| `--toast-min-width` | `280px` | 최소 너비 |
| `--toast-max-width` | `420px` | 최대 너비 |
| `--toast-padding-x` | `16px` | 좌우 여백 |
| `--toast-padding-y` | `12px` | 상하 여백 |
| `--toast-border-width` | `2px` | 테두리 두께 |
| `--toast-border-radius` | `var(--yds-border-radius)` | 모서리 둥글기 |
| `--toast-gap` | `8px` | 토스트 간 간격 |
| `--color-toast-bg` | `var(--color-background-tertiary)` | 배경색 |
| `--color-toast-text` | `var(--color-white)` | 텍스트 색상 |
| `--color-toast-border` | `var(--color-secondary-50)` | 테두리 색상 |
| `--z-index-toast` | `1400` | z-index |
