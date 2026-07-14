# Inline

Inline 컴포넌트는 자식들을 수평으로 나열(공간 부족 시 자동 줄바꿈)하고 사이 간격을 spacing 토큰으로 강제하는 레이아웃 컴포넌트입니다. 버튼 그룹, 칩 목록, 필터 바처럼 가로로 흐르는 요소 배치에 사용합니다.

## 기본 사용법

```tsx
import { Inline, Chips } from '@youngduck/yd-ui'

function App() {
  return (
    <Inline gap="md">
      <Chips variant="outlined" color="primary">식비</Chips>
      <Chips variant="outlined" color="primary">교통비</Chips>
      <Chips variant="outlined" color="primary">문화생활</Chips>
    </Inline>
  )
}
```

## 주요 특징

- **간격 토큰 강제**: `gap` 은 sm(4px) / md(8px) / lg(16px) 세 가지만 허용합니다. (기본값 md)
- **자동 줄바꿈**: 공간이 부족하면 flex-wrap 으로 다음 줄로 넘어갑니다.
- **정렬 지원**: `align`(교차축) / `justify`(주축) 로 배치를 제어합니다.

## 버튼 그룹 (우측 정렬)

```tsx
<Inline gap="md" justify="end">
  <Button size="sm" variant="outlined" color="primary">취소</Button>
  <Button size="sm" variant="fill" color="primary">저장</Button>
</Inline>
```

## 라벨-값 양끝 배치

```tsx
<Inline justify="between">
  <span className="text-yds-c1m text-primary-100">이번 달 총 예산</span>
  <span className="text-yds-s2 text-white">1,200,000원</span>
</Inline>
```

## Props

| Prop      | Type                                          | Default    | Description        |
|-----------|-----------------------------------------------|------------|--------------------|
| `gap`     | `'sm' \| 'md' \| 'lg'`                        | `'md'`     | 자식 사이 수평 간격 |
| `align`   | `'start' \| 'center' \| 'end'`                | `'center'` | 교차축(세로) 정렬  |
| `justify` | `'start' \| 'center' \| 'end' \| 'between'`   | `'start'`  | 주축(가로) 정렬    |

Inline은 표준 HTML div 요소의 모든 속성을 지원합니다.

## 디자인 토큰

- `--inline-gap-sm` / `-md` / `-lg`: spacing-1 / spacing-2 / spacing-4 (4 / 8 / 16px)

세로 나열은 [Stack](/components/stack) 을 사용합니다.
