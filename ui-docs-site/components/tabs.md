# Tabs

Tabs 컴포넌트는 컨테이너 안에서 여러 항목 중 하나를 선택하는 탭형 토글입니다. 구분선 색 테두리를 두른 네이비 컨테이너 안에서 선택된 탭은 노란(primary) 글자, 미선택 탭은 흰 글자로 표시되며, 지역·기간 필터 같은 단일 선택 UI에 적합합니다. `value` / `onValueChange` 로 상태를 관리하는 제어 컴포넌트입니다.

## 기본 사용법

```tsx
import { Tabs } from '@youngduck/yd-ui'
import { useState } from 'react'

function App() {
  const [value, setValue] = useState('all')

  return (
    <Tabs
      value={value}
      onValueChange={setValue}
      options={[
        { label: '전체', value: 'all' },
        { label: '국내', value: 'domestic' },
        { label: '해외', value: 'overseas' },
      ]}
    />
  )
}
```

## 주요 특징

- **제어 컴포넌트**: `value` / `onValueChange` 로 선택 상태를 직접 관리합니다.
- **options 기반**: `{ label, value, disabled? }` 배열로 탭을 구성합니다.
- **선택 강조**: 선택된 탭은 노란(primary-400) 글자, 미선택 탭은 흰 글자로 표시됩니다.
- **구분선 테두리**: 컨테이너에 Table 행 구분선과 같은 `--color-border-divider` 토큰의 테두리가 적용됩니다.
- **사이즈 지원**: sm / md / lg 세 가지 사이즈 제공 (기본값 md)
- **접근성**: `role="radiogroup"` / `role="radio"`, 방향키·Home·End 키보드 탐색, 로빙 탭인덱스 적용
- **디자인 토큰**: 색상·간격·타이포그래피를 모두 토큰에서 일괄 적용

## Sizes

`size` prop으로 sm / md / lg 를 선택할 수 있습니다.

```tsx
// Small
<Tabs size="sm" value={value} onValueChange={setValue} options={options} />

// Medium (기본)
<Tabs size="md" value={value} onValueChange={setValue} options={options} />

// Large
<Tabs size="lg" value={value} onValueChange={setValue} options={options} />
```

## 탭 비활성화

특정 탭만 비활성화하려면 해당 옵션에 `disabled: true` 를 지정합니다. 비활성화된 탭은 클릭·키보드 탐색에서 자동으로 제외됩니다.

```tsx
<Tabs
  value={value}
  onValueChange={setValue}
  options={[
    { label: '전체', value: 'all' },
    { label: '국내', value: 'domestic' },
    { label: '해외', value: 'overseas', disabled: true },
  ]}
/>
```

## 여러 필터 조합

여러 Tabs를 필터로 함께 배치할 수 있습니다. 각 그룹을 구분하기 위해 `aria-label` 을 지정하는 것을 권장합니다.

```tsx
const [region, setRegion] = useState('all')
const [period, setPeriod] = useState('day')

<div className="flex flex-wrap items-center gap-4">
  <Tabs
    value={region}
    onValueChange={setRegion}
    aria-label="지역 필터"
    options={[
      { label: '전체', value: 'all' },
      { label: '국내', value: 'domestic' },
      { label: '해외', value: 'overseas' },
    ]}
  />
  <Tabs
    value={period}
    onValueChange={setPeriod}
    aria-label="기간 필터"
    options={[
      { label: '일간', value: 'day' },
      { label: '주간', value: 'week' },
      { label: '월간', value: 'month' },
    ]}
  />
</div>
```

## 키보드 접근성

Tabs는 WAI-ARIA radiogroup 패턴을 따릅니다.

| 키 | 동작 |
|----|------|
| `Tab` | 선택된 탭으로 포커스 진입 (로빙 탭인덱스) |
| `←` / `↑` | 이전 탭 선택 (비활성 탭 건너뜀, 순환) |
| `→` / `↓` | 다음 탭 선택 (비활성 탭 건너뜀, 순환) |
| `Home` | 첫 번째 탭 선택 |
| `End` | 마지막 탭 선택 |

## Props

| Prop            | Type                          | Default | Description                       |
|-----------------|-------------------------------|---------|-----------------------------------|
| `options`       | `TabOption[]`                 | -       | 탭 항목 목록 (필수)               |
| `value`         | `string`                      | -       | 현재 선택된 값 (필수)             |
| `onValueChange` | `(value: string) => void`     | -       | 값 변경 시 호출되는 콜백 (필수)   |
| `size`          | `'sm' \| 'md' \| 'lg'`        | `'md'`  | 탭 사이즈                         |
| `aria-label`    | `string`                      | `'탭'`  | radiogroup 라벨                   |

`TabOption` 타입은 다음과 같습니다.

```ts
type TabOption = {
  label: string // 화면에 노출되는 라벨
  value: string // 선택 값으로 사용되는 고유 값
  disabled?: boolean // 개별 탭 비활성화 여부
}
```

Tabs는 표준 HTML div 요소의 속성(`onChange` 제외)을 함께 지원합니다.

## 디자인 토큰

Tabs 컴포넌트는 다음 디자인 토큰을 사용합니다.

### Spacing Tokens
- `--tabs-padding`: 컨테이너 안쪽 여백 (4px)
- `--tabs-gap`: 탭 사이 간격 (2px)
- `--tabs-border-radius`: 컨테이너 모서리 반경
- `--tabs-item-border-radius`: 개별 탭 모서리 반경 (6px)
- `--tabs-item-padding-x`: 탭 좌우 패딩 (16px)
- `--tabs-item-height-sm` / `-md` / `-lg`: 사이즈별 탭 높이 (28 / 34 / 42px)

### Typography Tokens
- `--tabs-typography-font-size`: yds-c1m 폰트 크기
- `--tabs-typography-line-height`: yds-c1m 라인 높이
- `--tabs-typography-font-weight`: yds-c1m 폰트 굵기
- `--tabs-typography-font-family`: Wanted Sans Variable

### Color Tokens
- `--color-tabs-bg`: 컨테이너 배경색 (secondary-300)
- `--color-tabs-border`: 컨테이너 테두리 색상 (border-divider, Table 구분선과 공유)
- `--color-tabs-item-text`: 미선택 탭 텍스트 색상 (white)
- `--color-tabs-item-text-hover`: 미선택 탭 hover 텍스트 색상 (primary-100)
- `--color-tabs-item-selected-text`: 선택된 탭 텍스트 색상 (primary-400, 노란색)
- `--color-tabs-focus-ring`: 포커스 링 색상 (white)
