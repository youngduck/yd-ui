# NumberInput

NumberInput 컴포넌트는 금액·수량 등 숫자 전용 입력 필드입니다. `type="number"` 의 네이티브 스핀 버튼(다크 테마에서 못생긴 화살표), 마우스 휠로 값이 바뀌는 사고, `e`/`+`/`-` 허용, 천단위 콤마 불가 문제를 피하기 위해 `type="text"` + `inputMode="numeric"` 조합에 자체 포맷팅을 얹었습니다. `value` / `onValueChange` 로 상태를 관리하는 제어 컴포넌트입니다.

## 기본 사용법

```tsx
import { NumberInput } from '@youngduck/yd-ui'
import { useState } from 'react'

function App() {
  const [amount, setAmount] = useState('') // 콤마 없는 숫자 문자열, 미입력 시 빈 문자열

  return <NumberInput value={amount} onValueChange={setAmount} suffix="원" placeholder="0" aria-label="금액" />
}
```

입력 중 `400000` 은 `400,000` 으로 표시되고, `onValueChange` 에는 콤마 없는 `'400000'` 이 전달됩니다. 숫자가 아닌 문자는 입력 단계에서 걸러집니다.

## 주요 특징

- **제어 컴포넌트**: `value` / `onValueChange` 로 상태를 직접 관리합니다. 값은 콤마 없는 숫자 문자열이며 **0 이상 정수만 지원**합니다.
- **천단위 콤마 자동 포맷**: 표시는 `400,000`, 값은 `'400000'`.
- **prefix / suffix**: 단위 문구가 입력 박스 안에 함께 정렬됩니다. (예: `suffix="원"`)
- **min / max / step**: blur 시 범위 밖 값을 보정하고, ↑/↓ 방향키로 `step` 단위 증감합니다.
- **우측 정렬 기본**: 숫자 입력 관례를 따르며 `align="left"` 로 변경할 수 있습니다.
- **사이즈 지원**: sm / md / lg / full 네 가지 너비 제공 (기본값 md)
- **접근성**: `role="spinbutton"` + `aria-valuenow/valuemin/valuemax`, 모바일에서 숫자 키패드 표시
- **디자인 토큰**: 색상·간격·타이포그래피를 모두 토큰에서 일괄 적용

## 예산 입력 예시

yd-bank 의 카테고리별 예산 입력처럼 사용하는 예시입니다.

```tsx
const [value, setValue] = useState(budget ? String(budget) : '')

<NumberInput
  size="sm"
  value={value}
  onValueChange={setValue}
  suffix="원"
  placeholder="0"
  aria-label={`${category.name} 예산`}
  onBlur={() => commit()}
  onKeyDown={e => {
    if (e.key === 'Enter') e.currentTarget.blur()
  }}
/>
```

## 키보드 접근성

WAI-ARIA spinbutton 패턴을 따릅니다.

| 키 | 동작 |
|----|------|
| `↑` | `step` 만큼 증가 (max 에서 멈춤) |
| `↓` | `step` 만큼 감소 (min 과 0 중 큰 값에서 멈춤) |
| `Backspace` | 커서 앞이 콤마면 콤마를 건너뛰고 숫자 삭제 |
| 숫자 입력 | 숫자 외 문자는 자동으로 걸러짐 |

## Props

| Prop            | Type                              | Default   | Description                                    |
|-----------------|-----------------------------------|-----------|------------------------------------------------|
| `value`         | `string`                          | -         | 현재 값, 콤마 없는 숫자 문자열 (필수)          |
| `onValueChange` | `(value: string) => void`         | -         | 값 변경 시 호출되는 콜백 (필수)                |
| `min`           | `number`                          | -         | 최소값 (blur 시 보정, 방향키 하한)             |
| `max`           | `number`                          | -         | 최대값 (blur 시 보정, 방향키 상한)             |
| `step`          | `number`                          | `1`       | 방향키(↑/↓) 증감 단위                          |
| `prefix`        | `string`                          | -         | 입력 앞 단위 문구                              |
| `suffix`        | `string`                          | -         | 입력 뒤 단위 문구 (예: '원')                   |
| `align`         | `'left' \| 'right'`               | `'right'` | 텍스트 정렬                                    |
| `disabled`      | `boolean`                         | `false`   | 입력 필드 비활성화 여부                        |
| `size`          | `'sm' \| 'md' \| 'lg' \| 'full'`  | `'md'`    | 입력 필드 너비 (200 / 300 / 400 / 100%)        |

NumberInput은 표준 HTML input 요소의 속성(`type`, `value`, `onChange`, `min`, `max`, `step`, `prefix`, `size` 제외)을 함께 지원합니다. 단위 문구는 스크린 리더에서 숨겨지므로(`aria-hidden`) `aria-label` 로 필드 의미를 지정하는 것을 권장합니다.

## 디자인 토큰

NumberInput 컴포넌트는 다음 디자인 토큰을 사용합니다.

### Spacing Tokens
- `--number-input-height`: 입력 필드 높이 (48px)
- `--number-input-size-sm-width` / `-md-` / `-lg-`: 사이즈별 너비 (200 / 300 / 400px)
- `--number-input-padding-x`: 좌우 패딩 (12px)
- `--number-input-gap`: 입력과 단위 문구 사이 간격 (8px)
- `--number-input-border-width`: 테두리 두께 (2px)
- `--number-input-border-radius`: 모서리 반경 (8px)

### Typography Tokens
- `--number-input-typography-*`: 입력 폰트 (yds-b2)
- `--number-input-affix-typography-*`: 단위 문구 폰트 (yds-c1m)

### Color Tokens
- `--color-number-input-border`: 테두리 색상 (primary-100)
- `--color-number-input-text`: 입력 텍스트 색상 (white)
- `--color-number-input-placeholder`: placeholder 색상 (secondary-50)
- `--color-number-input-affix-text`: 단위 문구 색상 (primary-100)
- `--color-number-input-focus-ring`: 포커스 링 색상 (white)
