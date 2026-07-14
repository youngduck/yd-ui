# Stack

Stack 컴포넌트는 자식들을 수직으로 나열하고 사이 간격을 spacing 토큰으로 강제하는 레이아웃 컴포넌트입니다. 화면마다 임의의 gap 값을 즉흥적으로 정하지 않도록 선택지를 sm / md / lg 세 가지로 좁혀, 어떤 화면을 만들어도 같은 간격 리듬이 나오게 하는 것이 목적입니다.

## 기본 사용법

```tsx
import { Stack, Field, NumberInput, DatePicker } from '@youngduck/yd-ui'

function App() {
  return (
    <Stack gap="lg">
      <Field label="금액">
        <NumberInput size="full" value={amount} onValueChange={setAmount} suffix="원" />
      </Field>
      <Field label="날짜">
        <DatePicker size="full" value={date} onValueChange={setDate} />
      </Field>
    </Stack>
  )
}
```

## 주요 특징

- **간격 토큰 강제**: `gap` 은 sm(8px) / md(16px) / lg(24px) 세 가지만 허용합니다. (기본값 md)
- **교차축 정렬**: `align` 으로 start / center / end / stretch 를 지정합니다. (기본값 stretch)
- **표준 div 속성 지원**: `className` 으로 너비 등 추가 스타일을 지정할 수 있습니다.

## Gap

```tsx
<Stack gap="sm">밀접한 요소 사이 (8px)</Stack>
<Stack gap="md">기본 수직 간격 (16px)</Stack>
<Stack gap="lg">폼 필드·섹션 사이 (24px)</Stack>
```

## Props

| Prop    | Type                                        | Default     | Description        |
|---------|---------------------------------------------|-------------|--------------------|
| `gap`   | `'sm' \| 'md' \| 'lg'`                      | `'md'`      | 자식 사이 수직 간격 |
| `align` | `'start' \| 'center' \| 'end' \| 'stretch'` | `'stretch'` | 교차축(가로) 정렬  |

Stack은 표준 HTML div 요소의 모든 속성을 지원합니다.

## 디자인 토큰

- `--stack-gap-sm` / `-md` / `-lg`: spacing-2 / spacing-4 / spacing-6 (8 / 16 / 24px)

가로 나열은 [Inline](/components/inline), 폼 필드 묶음은 [Field](/components/field) 를 사용합니다.
