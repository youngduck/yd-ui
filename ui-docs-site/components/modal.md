# Modal

모달 컴포넌트는 사용자에게 집중된 콘텐츠를 오버레이로 표시합니다.

## 기본 사용법

```tsx
import { useOverlay } from '@youngduck/yd-ui/Overlays'
import { Button } from '@youngduck/yd-ui'

function App() {
  const { modalOpen } = useOverlay()

  return (
    <Button
      onClick={() =>
        modalOpen({
          config: { size: 'md' },
          content: (
            <div>
              <h2>모달 제목</h2>
              <p>모달 내용</p>
            </div>
          ),
        })
      }
    >
      모달 열기
    </Button>
  )
}
```

## 함수형 Content (onClose 콜백)

content에 함수를 전달하면 `onClose` 콜백을 받아 내부에서 닫기 처리가 가능합니다.

```tsx
modalOpen({
  config: { size: 'md' },
  content: (onClose) => (
    <div>
      <h2>모달 제목</h2>
      <p>onClose 콜백으로 내부에서 닫기 가능</p>
      <Button onClick={onClose}>닫기</Button>
    </div>
  ),
})
```

## Sizes

`config.size`로 sm / md / lg / xl 사이즈를 선택할 수 있습니다.

```tsx
modalOpen({ config: { size: 'sm' }, content: <div>Small</div> })
modalOpen({ config: { size: 'md' }, content: <div>Medium</div> })
modalOpen({ config: { size: 'lg' }, content: <div>Large</div> })
modalOpen({ config: { size: 'xl' }, content: <div>Extra Large</div> })
```

## 키보드 및 포커스 관리

- **ESC** — 모달 닫기
- **Tab / Shift+Tab** — 모달 내부에서만 포커스 순환 (포커스 트랩)
- 열릴 때 첫 번째 포커스 가능 요소에 자동 포커스
- 닫힐 때 이전 포커스 위치로 자동 복귀

## 접근성

- `role="dialog"`, `aria-modal="true"` 적용
- 포커스 트랩으로 모달 외부 요소에 포커스 불가

## 닫기 방식

- 배경(backdrop) 클릭
- ESC 키
- 함수형 content의 `onClose` 콜백 호출

## API

### modalOpen 옵션

| 옵션 | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| `config.size` | `'sm' \| 'md' \| 'lg' \| 'xl'` | - | 모달 크기 (필수) |
| `content` | `ReactNode \| ((onClose) => ReactNode)` | - | 모달 내용 (필수) |

### 사이즈별 크기

| 사이즈 | 너비 | 높이 | 최대 높이 |
|--------|------|------|-----------|
| `sm` | 320px | 400px | 400px |
| `md` | 480px | 600px | 600px |
| `lg` | 640px | 800px | 800px |
| `xl` | 800px | 900px | 900px |

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
