# Button

버튼 컴포넌트는 사용자 상호작용을 위한 클릭 가능한 요소입니다.

## 기본 사용법

```tsx
import { Button } from '@youngduck/yd-ui'

function App() {
  return <Button>클릭하세요</Button>
}
```

## Variants

### Fill (기본)

```tsx
<Button variant="fill" color="primary">
  Fill Button
</Button>
```

### Outlined

```tsx
<Button variant="outlined" color="primary">
  Outlined Button
</Button>
```

## Sizes

버튼 크기를 조절할 수 있습니다.

```tsx
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>
<Button size="full">Full Width</Button>
```

## Disabled 상태

```tsx
<Button disabled>Disabled Button</Button>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'fill' \| 'outlined'` | `'fill'` | 버튼 스타일 variant |
| `size` | `'sm' \| 'md' \| 'lg' \| 'full'` | `'md'` | 버튼 크기 |
| `color` | `'primary'` | `'primary'` | 버튼 색상 |
| `disabled` | `boolean` | `false` | 비활성화 상태 |
| `isActive` | `boolean` | `false` | 활성 상태 |
| `className` | `string` | `''` | 추가 CSS 클래스 |
| `children` | `React.ReactNode` | - | 버튼 내용 |

Button은 표준 HTML button 요소의 모든 속성을 지원합니다.

## 타입

```tsx
import type { ButtonSize, ButtonVariant, ButtonColor } from '@youngduck/yd-ui'

const size: ButtonSize = 'md'
const variant: ButtonVariant = 'fill'
const color: ButtonColor = 'primary'
```

