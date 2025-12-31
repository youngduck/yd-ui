# CheckBox

체크박스 컴포넌트는 선택 상태를 나타내는 입력 요소입니다.

## 기본 사용법

```tsx
import { useState } from 'react'
import { CheckBox } from '@youngduck/yd-ui'

function App() {
  const [checked, setChecked] = useState(false)

  return (
    <CheckBox
      checked={checked}
      onCheckedChange={setChecked}
      value="동의합니다"
    />
  )
}
```

## Shapes

### Square (기본)

```tsx
<CheckBox
  checked={checked}
  onCheckedChange={setChecked}
  shape="square"
  value="Square CheckBox"
/>
```

### Check

```tsx
<CheckBox
  checked={checked}
  onCheckedChange={setChecked}
  shape="check"
  value="Check Icon"
/>
```

## Indeterminate 상태

부분 선택 상태를 나타냅니다.

```tsx
<CheckBox
  checked={false}
  indeterminate={true}
  onCheckedChange={setChecked}
  value="Indeterminate"
/>
```

## Controlled 모드

CheckBox는 controlled 모드만 지원합니다. `checked`와 `onCheckedChange`는 필수입니다.

```tsx
import { useState } from 'react'
import { CheckBox } from '@youngduck/yd-ui'

function App() {
  const [checked, setChecked] = useState(false)

  return (
    <CheckBox
      checked={checked}
      onCheckedChange={setChecked}
      value="옵션 1"
    />
  )
}
```

## 여러 체크박스

```tsx
import { useState } from 'react'
import { CheckBox } from '@youngduck/yd-ui'

function App() {
  const [options, setOptions] = useState({
    option1: false,
    option2: false,
    option3: false,
  })

  return (
    <div>
      <CheckBox
        checked={options.option1}
        onCheckedChange={(checked) =>
          setOptions({ ...options, option1: checked })
        }
        value="옵션 1"
      />
      <CheckBox
        checked={options.option2}
        onCheckedChange={(checked) =>
          setOptions({ ...options, option2: checked })
        }
        value="옵션 2"
      />
      <CheckBox
        checked={options.option3}
        onCheckedChange={(checked) =>
          setOptions({ ...options, option3: checked })
        }
        value="옵션 3"
      />
    </div>
  )
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `checked` | `boolean` | **필수** | 체크 상태 |
| `onCheckedChange` | `(checked: boolean) => void` | **필수** | 체크 상태 변경 핸들러 |
| `value` | `string` | - | 체크박스 값 |
| `shape` | `'square' \| 'check'` | `'square'` | 체크박스 모양 |
| `indeterminate` | `boolean` | `false` | 부분 선택 상태 |
| `id` | `string` | - | 체크박스 ID (자동 생성) |
| `name` | `string` | - | 폼 필드 이름 |
| `className` | `string` | `''` | 추가 CSS 클래스 |

CheckBox는 표준 HTML input 요소의 대부분의 속성을 지원합니다 (type, checked, onChange, onCheckedChange, indeterminate 제외).

## 접근성

- 키보드 네비게이션 지원 (Enter, Space)
- `aria-checked` 속성 자동 설정
- `tabIndex` 지원

