# Input

입력 필드 컴포넌트는 사용자 입력을 받는 기본 입력 필드입니다. 자유 텍스트(text / password / email 등) 입력을 담당하며, 금액·수량 같은 숫자 입력에는 [NumberInput](/components/number-input), 날짜 입력에는 [DatePicker](/components/date-picker) 사용을 권장합니다.

## 기본 사용법

```tsx
import { Input } from '@youngduck/yd-ui'

function App() {
  return <Input placeholder="입력하세요" />
}
```

## Variants

### Input (기본)

```tsx
<Input variant="input" placeholder="텍스트 입력" />
```

### Search

검색 아이콘이 포함된 입력 필드입니다.

```tsx
<Input variant="search" placeholder="검색어를 입력하세요" />
```

## Sizes

입력 필드 크기를 조절할 수 있습니다.

```tsx
<Input size="sm" placeholder="Small" />
<Input size="md" placeholder="Medium" />
<Input size="lg" placeholder="Large" />
<Input size="full" placeholder="Full Width" />
```

## Colors

입력 필드 색상을 조절할 수 있습니다.

```tsx
<Input color="white" placeholder="White" />
<Input color="primary-400" placeholder="Primary 400" />
<Input color="primary-100" placeholder="Primary 100" />
```

## Disabled 상태

```tsx
<Input disabled placeholder="Disabled Input" />
```

## Controlled Input

```tsx
import { useState } from 'react'
import { Input } from '@youngduck/yd-ui'

function App() {
  const [value, setValue] = useState('')

  return (
    <Input
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder="Controlled Input"
    />
  )
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'search' \| 'input'` | `'input'` | 입력 필드 variant |
| `size` | `'sm' \| 'md' \| 'lg' \| 'full'` | `'md'` | 입력 필드 크기 |
| `color` | `'white' \| 'primary-400' \| 'primary-100'` | `'primary-100'` | 입력 필드 색상 |
| `disabled` | `boolean` | `false` | 비활성화 상태 |
| `className` | `string` | `''` | 추가 CSS 클래스 |

Input은 표준 HTML input 요소의 모든 속성을 지원합니다 (size, color 제외).

## 타입

```tsx
import type { InputSize, InputVariant, InputColor } from '@youngduck/yd-ui'

const size: InputSize = 'md'
const variant: InputVariant = 'input'
const color: InputColor = 'primary-100'
```

## 디자인 토큰

Input 컴포넌트는 다음 디자인 토큰을 사용합니다.

### Spacing Tokens
- `--input-height`: 입력 필드 높이 (48px)
- `--input-size-sm-width` / `-md-` / `-lg-`: 사이즈별 너비 (200 / 300 / 400px)
- `--input-padding-x`: 좌우 패딩 (12px)
- `--input-search-padding-left`: search variant 좌측 패딩, 아이콘 공간 (40px)
- `--input-border-width`: 테두리 두께 (2px)
- `--input-border-radius`: 모서리 반경 (8px)

### Typography Tokens
- `--input-typography-*`: 입력 폰트 (yds-b2)

### Color Tokens
- `--color-input-white`: white 색상 (white)
- `--color-input-primary-400`: primary-400 색상 (primary-400)
- `--color-input-primary-100`: primary-100 색상 (primary-100)

각 색상은 테두리·텍스트·placeholder·search 아이콘에 일괄 적용됩니다. `type="number"` 를 사용하는 경우에도 브라우저 기본 스핀 버튼은 자동으로 숨겨집니다.

