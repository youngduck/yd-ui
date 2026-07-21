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

## 고정 헤더 / 푸터 (Sticky Header & Footer)

`config.title`과 `config.footer`를 넘기면 본문이 길어져도 **제목은 상단, 버튼은 하단에 고정**되고 가운데 본문(`content`)만 스크롤됩니다.

```tsx
modalOpen({
  config: {
    size: 'md',
    title: '고정 제목 영역',
    footer: (onClose) => (
      <div style={{ display: 'flex', gap: 8 }}>
        <Button size="full" variant="outlined" onClick={onClose}>
          닫기
        </Button>
        <Button size="full" variant="fill" onClick={onClose}>
          확인
        </Button>
      </div>
    ),
  },
  content: <div>아무리 길어도 이 영역만 스크롤됩니다.</div>,
})
```

- `title` / `footer`는 선택 옵션입니다. 넘기지 않으면 기존처럼 `content` 전체가 하나의 스크롤 영역이 됩니다. (하위 호환)
- `footer`는 `content`와 동일하게 `(onClose) => ReactNode` 함수형을 지원해 내부 버튼에서 닫기를 처리할 수 있습니다.
- `title`을 넘기면 `aria-labelledby`로 스크린리더에 제목이 연결됩니다.

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

- 모달 박스에 `role="dialog"`, `aria-modal="true"` 적용
- `title`을 넘기면 `aria-labelledby`로 제목을 연결해 스크린리더가 모달 이름을 읽습니다
- 포커스 트랩으로 모달 외부 요소에 포커스 불가

## 배경 스크롤 잠금

모달이 열려 있는 동안 배경(body) 스크롤이 잠깁니다.

- 모달이 여러 개 겹쳐 떠도 참조 카운팅으로 관리되어, **마지막 모달이 닫힐 때만** 잠금이 해제됩니다
- 스크롤바가 사라지며 생기는 배경 콘텐츠의 좌우 밀림(레이아웃 이동)을 자동 보정합니다
- Toast는 배경 조작을 막지 않아야 하므로 스크롤 잠금 대상에서 제외됩니다

## 닫기 방식

- 배경(backdrop) 클릭
- ESC 키
- 함수형 content의 `onClose` 콜백 호출

## API

### modalOpen 옵션

| 옵션 | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| `config.size` | `'sm' \| 'md' \| 'lg' \| 'xl'` | - | 모달 크기 (필수) |
| `config.title` | `ReactNode` | - | 상단 고정 제목 영역 (선택) |
| `config.footer` | `ReactNode \| ((onClose) => ReactNode)` | - | 하단 고정 버튼 영역 (선택) |
| `content` | `ReactNode \| ((onClose) => ReactNode)` | - | 스크롤되는 본문 (필수) |

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
