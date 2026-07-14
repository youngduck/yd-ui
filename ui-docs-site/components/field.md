# Field

Field 컴포넌트는 폼 입력 하나를 라벨 + 입력 + 설명/에러 메시지의 표준 구조로 묶는 컴포넌트입니다. 폼을 만들 때마다 라벨 간격과 타이포그래피, 에러 표시 방식을 즉흥적으로 정하지 않도록 결정을 컴포넌트에 담았습니다.

## 기본 사용법

```tsx
import { Field, Input } from '@youngduck/yd-ui'

function App() {
  return (
    <Field label="내용" description="거래 내역에 표시될 이름입니다.">
      <Input size="full" placeholder="예: 점심 식사" />
    </Field>
  )
}
```

## 주요 특징

- **표준 구조**: 라벨(yds-c1m, primary-100) + 임의의 입력(children) + 설명/에러 메시지(yds-c1r)
- **에러 표시**: `error` 지정 시 설명 대신 에러가 표시되고 `role="alert"` 로 스크린 리더에 즉시 전달됩니다.
- **필수 표시**: `required` 지정 시 라벨 옆에 빨간 별표(*)가 붙습니다.
- **라벨 클릭 포커스**: label 요소로 감싸므로 네이티브 input 은 라벨 클릭 시 자동으로 포커스됩니다.
- **입력 무관**: Input / NumberInput / DatePicker / SelectBox 등 어떤 입력이든 children 으로 감쌀 수 있습니다.

## 에러 상태

```tsx
<Field label="금액" required error="금액을 0보다 큰 숫자로 입력하세요.">
  <NumberInput size="full" value={amount} onValueChange={setAmount} suffix="원" />
</Field>
```

## 폼 조합 예시

여러 Field 를 세로로 배치할 때는 [Stack](/components/stack) 으로 감쌉니다.

```tsx
<Stack gap="lg">
  <Field label="금액" required>
    <NumberInput size="full" value={amount} onValueChange={setAmount} suffix="원" />
  </Field>
  <Field label="날짜" required>
    <DatePicker size="full" value={date} onValueChange={setDate} />
  </Field>
  <Inline gap="md" justify="end">
    <Button size="sm" variant="outlined" color="primary">취소</Button>
    <Button size="sm" variant="fill" color="primary">저장</Button>
  </Inline>
</Stack>
```

## Props

| Prop          | Type              | Default | Description                              |
|---------------|-------------------|---------|------------------------------------------|
| `label`       | `string`          | -       | 입력 위에 표시되는 라벨 (필수)           |
| `description` | `string`          | -       | 입력 아래 보조 설명                      |
| `error`       | `string`          | -       | 에러 메시지. 지정 시 설명 대신 표시      |
| `required`    | `boolean`         | `false` | 필수 입력 표시(*) 여부                   |
| `children`    | `React.ReactNode` | -       | 라벨이 감쌀 입력 요소 (필수)             |

Field는 표준 HTML label 요소의 속성을 함께 지원합니다.

## 디자인 토큰

- `--field-gap`: 라벨·입력·메시지 사이 간격 (spacing-2, 8px)
- `--color-field-label-text`: 라벨 색상 (primary-100)
- `--color-field-description-text`: 설명 색상 (secondary-50)
- `--color-field-error-text`: 에러 메시지 색상 (error)
- `--color-field-required-mark`: 필수 표시 색상 (error)
