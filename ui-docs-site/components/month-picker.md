# MonthPicker

MonthPicker 컴포넌트는 연도 + 월을 선택하는 달력 피커입니다. 트리거 버튼을 누르면 연도 헤더와 12개월 그리드 패널이 드롭다운으로 열리고, 선택된 월은 노란(primary) 배경 + 검정 글씨로 강조됩니다. `value` / `onValueChange` 로 상태를 관리하는 제어 컴포넌트입니다.

## 기본 사용법

```tsx
import { MonthPicker } from '@youngduck/yd-ui'
import { useState } from 'react'

function App() {
  const [month, setMonth] = useState('') // 'YYYY-MM' 형식, 미선택 시 빈 문자열

  return <MonthPicker value={month} onValueChange={setMonth} />
}
```

## 주요 특징

- **제어 컴포넌트**: `value` / `onValueChange` 로 선택 상태를 직접 관리합니다. 값은 `'2026-07'` 같은 `YYYY-MM` 형식 문자열입니다. (`input type="month"` 와 호환)
- **연도 이동**: 헤더의 이전/다음 버튼으로 연도를 한 해씩 이동합니다.
- **연도 범위 제한**: `minYear` / `maxYear` 로 이동 가능한 범위를 제한합니다. (기본값 1900 ~ 2100)
- **선택/이번 달 강조**: 선택된 월은 노란(primary-400) 배경 + 검정 글씨, 이번 달은 노란 테두리로 표시됩니다.
- **사이즈 지원**: sm / md / lg / full 네 가지 트리거 너비 제공 (기본값 md)
- **접근성**: `aria-haspopup="dialog"` 트리거, 방향키·Home·End 그리드 탐색, Escape 닫기 + 트리거 포커스 복귀
- **디자인 토큰**: 색상·간격·타이포그래피를 모두 토큰에서 일괄 적용

## 연도 범위 제한

```tsx
<MonthPicker value={month} onValueChange={setMonth} minYear={2020} maxYear={2030} />
```

## 키보드 접근성

패널은 대화상자(dialog) 패턴을 따르며 그리드 셀에는 로빙 탭인덱스가 적용됩니다.

| 키 | 동작 |
|----|------|
| `Enter` / `Space` | 트리거: 패널 열기 · 셀: 월 선택 후 닫기 |
| `Tab` / `Shift+Tab` | 패널 안에서 포커스 순환 (이전/다음 버튼 ↔ 그리드) |
| `←` / `→` | 이전 / 다음 월 셀로 포커스 이동 |
| `↑` / `↓` | 한 행(3칸) 위 / 아래로 포커스 이동 |
| `Home` / `End` | 현재 행의 처음 / 끝으로 포커스 이동 |
| `Escape` | 패널 닫기 + 트리거로 포커스 복귀 |

## Props

| Prop            | Type                              | Default     | Description                              |
|-----------------|-----------------------------------|-------------|------------------------------------------|
| `value`         | `string`                          | -           | 현재 선택된 값, `YYYY-MM` 형식 (필수)    |
| `onValueChange` | `(value: string) => void`         | -           | 값 변경 시 호출되는 콜백 (필수)          |
| `minYear`       | `number`                          | `1900`      | 선택 가능한 최소 연도                    |
| `maxYear`       | `number`                          | `2100`      | 선택 가능한 최대 연도                    |
| `placeholder`   | `string`                          | `'월 선택'` | 미선택 시 트리거에 표시할 문구           |
| `disabled`      | `boolean`                         | `false`     | 피커 전체 비활성화 여부                  |
| `size`          | `'sm' \| 'md' \| 'lg' \| 'full'`  | `'md'`      | 트리거 너비 사이즈 (200 / 300 / 400 / 100%) |

MonthPicker는 표준 HTML div 요소의 속성(`onChange` 제외)을 함께 지원합니다.

## 디자인 토큰

MonthPicker는 YearPicker / DatePicker와 공통으로 Calendar 토큰을 사용합니다. 전체 목록은 [DatePicker 문서의 디자인 토큰](/components/date-picker#디자인-토큰) 을 참고하세요.
