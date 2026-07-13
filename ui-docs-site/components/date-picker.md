# DatePicker

DatePicker 컴포넌트는 연도 + 월 + 일을 선택하는 달력 피커입니다. 트리거 버튼을 누르면 요일 헤더와 6주 고정 날짜 그리드 패널이 드롭다운으로 열리고, 선택된 날짜는 노란(primary) 배경 + 검정 글씨로 강조됩니다. 거래 발생일처럼 폼에서 날짜 하나를 입력받을 때 사용하며, `value` / `onValueChange` 로 상태를 관리하는 제어 컴포넌트입니다.

## 기본 사용법

```tsx
import { DatePicker } from '@youngduck/yd-ui'
import { useState } from 'react'

function App() {
  const [date, setDate] = useState('') // 'YYYY-MM-DD' 형식, 미선택 시 빈 문자열

  return <DatePicker value={date} onValueChange={setDate} />
}
```

## 주요 특징

- **제어 컴포넌트**: `value` / `onValueChange` 로 선택 상태를 직접 관리합니다. 값은 `'2026-07-10'` 같은 `YYYY-MM-DD` 형식 문자열입니다. (`input type="date"` 와 호환)
- **월 이동**: 헤더의 이전/다음 버튼으로 월을 한 달씩 이동합니다.
- **6주 고정 그리드**: 항상 42칸으로 렌더링해 월을 이동해도 패널 높이가 변하지 않습니다. 앞뒤 빈 칸은 이전/다음 달 날짜로 채워지며(흐리게 표시) 바로 선택할 수 있습니다.
- **연도 범위 제한**: `minYear` / `maxYear` 로 이동 가능한 범위를 제한합니다. (기본값 1900 ~ 2100)
- **선택/오늘 강조**: 선택된 날짜는 노란(primary-400) 배경 + 검정 글씨, 오늘은 노란 테두리 + `aria-current="date"` 로 표시됩니다.
- **사이즈 지원**: sm / md / lg / full 네 가지 트리거 너비 제공 (기본값 md)
- **접근성**: `aria-haspopup="dialog"` 트리거, 방향키(±1일/±1주)·Home·End 그리드 탐색, Escape 닫기 + 트리거 포커스 복귀
- **디자인 토큰**: 색상·간격·타이포그래피를 모두 토큰에서 일괄 적용

## 폼에서 사용하기

거래 추가 모달처럼 폼 필드로 사용할 때는 `size="full"` 로 부모 너비에 맞춥니다.

```tsx
const [occurredOn, setOccurredOn] = useState('')

<label className="flex flex-col gap-2">
  <span>날짜</span>
  <DatePicker size="full" value={occurredOn} onValueChange={setOccurredOn} />
</label>
```

## 키보드 접근성

패널은 대화상자(dialog) 패턴을 따르며 날짜 그리드에는 로빙 탭인덱스가 적용됩니다.

| 키 | 동작 |
|----|------|
| `Enter` / `Space` | 트리거: 패널 열기 · 셀: 날짜 선택 후 닫기 |
| `Tab` / `Shift+Tab` | 패널 안에서 포커스 순환 (이전/다음 버튼 ↔ 그리드) |
| `←` / `→` | 하루 이전 / 다음 날짜로 포커스 이동 |
| `↑` / `↓` | 한 주(7일) 이전 / 다음 날짜로 포커스 이동 |
| `Home` / `End` | 현재 주의 처음(일요일) / 끝(토요일)으로 포커스 이동 |
| `Escape` | 패널 닫기 + 트리거로 포커스 복귀 |

## Props

| Prop            | Type                              | Default       | Description                                 |
|-----------------|-----------------------------------|---------------|---------------------------------------------|
| `value`         | `string`                          | -             | 현재 선택된 값, `YYYY-MM-DD` 형식 (필수)    |
| `onValueChange` | `(value: string) => void`         | -             | 값 변경 시 호출되는 콜백 (필수)             |
| `minYear`       | `number`                          | `1900`        | 선택 가능한 최소 연도                       |
| `maxYear`       | `number`                          | `2100`        | 선택 가능한 최대 연도                       |
| `placeholder`   | `string`                          | `'날짜 선택'` | 미선택 시 트리거에 표시할 문구              |
| `disabled`      | `boolean`                         | `false`       | 피커 전체 비활성화 여부                     |
| `size`          | `'sm' \| 'md' \| 'lg' \| 'full'`  | `'md'`        | 트리거 너비 사이즈 (200 / 300 / 400 / 100%) |

DatePicker는 표준 HTML div 요소의 속성(`onChange` 제외)을 함께 지원합니다.

## 디자인 토큰

Calendar 계열(YearPicker / MonthPicker / DatePicker)은 다음 디자인 토큰을 공통으로 사용합니다.

### Spacing Tokens
- `--calendar-size-sm-width` / `-md-` / `-lg-`: 사이즈별 트리거 너비 (200 / 300 / 400px)
- `--calendar-trigger-height`: 트리거 높이 (48px)
- `--calendar-trigger-padding-x`: 트리거 좌우 패딩 (12px)
- `--calendar-border-width`: 트리거/패널 테두리 두께 (2px)
- `--calendar-border-radius`: 트리거/패널 모서리 반경
- `--calendar-panel-top`: 트리거 기준 패널 시작 위치 (56px)
- `--calendar-panel-min-width`: 패널 최소 너비 (296px)
- `--calendar-panel-padding`: 패널 안쪽 여백 (12px)
- `--calendar-panel-gap`: 헤더/그리드 사이 간격 (8px)
- `--calendar-grid-gap`: 셀 사이 간격 (4px)
- `--calendar-cell-height`: 셀 높이 (34px)
- `--calendar-cell-border-radius`: 셀 모서리 반경
- `--calendar-nav-button-size`: 이전/다음 버튼 크기 (28px)

### Typography Tokens
- `--calendar-trigger-typography-*`: 트리거 폰트 (yds-b2)
- `--calendar-typography-*`: 헤더/셀 폰트 (yds-c1m)
- `--calendar-typography-font-family`: Wanted Sans Variable

### Color Tokens
- `--color-calendar-trigger-border`: 트리거 테두리 색상 (primary-100)
- `--color-calendar-trigger-text`: 트리거 텍스트 색상 (primary-100)
- `--color-calendar-trigger-placeholder`: 미선택 placeholder 색상 (secondary-50)
- `--color-calendar-panel-bg`: 패널 배경색 (secondary-300)
- `--color-calendar-panel-border`: 패널 테두리 색상 (primary-100)
- `--color-calendar-header-text`: 헤더 라벨 색상 (white)
- `--color-calendar-nav-button-text`: 이동 버튼 색상 (primary-100)
- `--color-calendar-weekday-text`: 요일 헤더 색상 (secondary-50)
- `--color-calendar-cell-text`: 셀 텍스트 색상 (white)
- `--color-calendar-cell-bg-hover`: 셀 hover 배경색 (secondary-400)
- `--color-calendar-cell-outside-text`: 다른 달 날짜 색상 (secondary-50)
- `--color-calendar-cell-selected-bg`: 선택된 셀 배경색 (primary-400, 노란색)
- `--color-calendar-cell-selected-text`: 선택된 셀 텍스트 색상 (black)
- `--color-calendar-cell-today-border`: 오늘 표시 테두리 색상 (primary-100)
- `--color-calendar-focus-ring`: 포커스 링 색상 (white)

### Z-index Tokens
- `--z-index-calendar-panel`: 패널 z-index (1000)
