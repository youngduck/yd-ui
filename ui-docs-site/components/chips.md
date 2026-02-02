# Chips

칩 컴포넌트는 작은 라벨이나 태그를 표시하는 데 사용되는 컴포넌트입니다. Button 컴포넌트와 유사하게 fill과 outlined variant를 지원하며, primary 색상을 사용합니다.

## 기본 사용법

```tsx
import { Chips } from '@youngduck/yd-ui'

function App() {
  return (
    <Chips variant="fill" color="primary">
      <span className="text-black">칩 내용</span>
    </Chips>
  )
}
```

## 주요 특징

- **Variant 지원**: fill과 outlined 두 가지 스타일 제공
- **Primary 색상**: Button과 동일한 primary 색상 사용
- **고정 높이**: height는 30px로 고정되어 있습니다 (토큰화)
- **가변 너비**: width는 내용에 따라 자동으로 조정됩니다 (inline-flex)
- **좌우 패딩**: 12px의 좌우 패딩이 적용됩니다 (토큰화)
- **폰트**: yds-c1m 폰트 스타일 사용 (토큰화)
- **cva 기반**: variant와 color prop으로만 스타일 조정

## Variants

Chips는 두 가지 variant를 지원합니다.

### Fill

배경색이 채워진 스타일입니다.

```tsx
<Chips variant="fill" color="primary">
  <span className="text-black">태그</span>
</Chips>
```

### Outlined

테두리만 있는 스타일입니다.

```tsx
<Chips variant="outlined" color="primary">
  <span className="text-primary-400">태그</span>
</Chips>
```

## children 활용

`children`에 텍스트나 다른 요소를 넣어 사용할 수 있습니다. fill variant는 검은색 텍스트, outlined variant는 primary 색상 텍스트를 사용합니다.

```tsx
// Fill variant
<Chips variant="fill" color="primary">
  <span className="text-black">태그</span>
</Chips>

// Outlined variant
<Chips variant="outlined" color="primary">
  <span className="text-primary-400">태그</span>
</Chips>
```

## 여러 칩 조합

여러 칩을 함께 사용할 때는 flex 레이아웃을 활용합니다.

```tsx
// Fill variant 조합
<div className="flex flex-wrap gap-2">
  <Chips variant="fill" color="primary">
    <span className="text-black">태그1</span>
  </Chips>
  <Chips variant="fill" color="primary">
    <span className="text-black">태그2</span>
  </Chips>
  <Chips variant="fill" color="primary">
    <span className="text-black">태그3</span>
  </Chips>
</div>

// Outlined variant 조합
<div className="flex flex-wrap gap-2">
  <Chips variant="outlined" color="primary">
    <span className="text-primary-400">태그1</span>
  </Chips>
  <Chips variant="outlined" color="primary">
    <span className="text-primary-400">태그2</span>
  </Chips>
  <Chips variant="outlined" color="primary">
    <span className="text-primary-400">태그3</span>
  </Chips>
</div>
```

## Props

| Prop       | Type           | Default | Description      |
|------------|----------------|---------|------------------|
| `variant`  | `'fill' \| 'outlined'` | `'fill'` | 칩 스타일 variant |
| `color`    | `'primary'`     | `'primary'` | 칩 색상 |
| `children` | `React.ReactNode` | -     | 칩 내용       |

Chips는 표준 HTML div 요소의 모든 속성을 지원합니다. width는 내용에 따라 자동으로 조정되며, variant와 color prop으로만 스타일을 제어합니다.

## 디자인 토큰

Chips 컴포넌트는 다음 디자인 토큰을 사용합니다:

### Spacing Tokens
- `--chips-height`: 30px (고정 높이)
- `--chips-padding-x`: 12px (좌우 패딩)

### Typography Tokens
- `--chips-typography-font-size`: yds-c1m 폰트 크기
- `--chips-typography-line-height`: yds-c1m 라인 높이
- `--chips-typography-font-weight`: yds-c1m 폰트 굵기
- `--chips-typography-font-family`: Wanted Sans Variable

### Color Tokens
- `--color-chips-fill-primary-bg`: Fill variant 배경색
- `--color-chips-fill-primary-text`: Fill variant 텍스트 색상
- `--color-chips-outlined-primary-bg`: Outlined variant 배경색 (transparent)
- `--color-chips-outlined-primary-border`: Outlined variant 테두리 색상
- `--color-chips-outlined-primary-text`: Outlined variant 텍스트 색상

### Common Tokens
- `--yds-border-width`: 2px
- `--yds-border-radius`: 8px
