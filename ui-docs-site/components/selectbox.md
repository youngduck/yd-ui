# SelectBox

선택박스 컴포넌트는 드롭다운 목록에서 옵션을 선택할 수 있는 컴포넌트입니다.

## 기본 사용법

`useSelectBox` hook을 사용하여 SelectBox를 제어합니다.

```tsx
import { SelectBox, useSelectBox } from '@youngduck/yd-ui'

function App() {
  const options = [
    { label: 'option1', value: '옵션 1' },
    { label: 'option2', value: '옵션 2' },
    { label: 'option3', value: '옵션 3' },
  ]

  const selectBoxHook = useSelectBox({
    options,
    defaultValue: 'option1',
  })

  return <SelectBox selectBoxHook={selectBoxHook} />
}
```

## Uncontrolled 모드

```tsx
import { SelectBox, useSelectBox } from '@youngduck/yd-ui'

function App() {
  const options = [
    { label: 'option1', value: '옵션 1' },
    { label: 'option2', value: '옵션 2' },
    { label: 'option3', value: '옵션 3' },
  ]

  const selectBoxHook = useSelectBox({
    options,
    defaultValue: 'option1', // 초기값 설정
  })

  return <SelectBox selectBoxHook={selectBoxHook} />
}
```

## Controlled 모드

```tsx
import { useState } from 'react'
import { SelectBox, useSelectBox } from '@youngduck/yd-ui'

function App() {
  const [selectedValue, setSelectedValue] = useState('option1')

  const options = [
    { label: 'option1', value: '옵션 1' },
    { label: 'option2', value: '옵션 2' },
    { label: 'option3', value: '옵션 3' },
  ]

  const selectBoxHook = useSelectBox({
    options,
    value: selectedValue, // controlled value
    onChange: (value, option) => {
      setSelectedValue(value)
      console.log('Selected:', option)
    },
  })

  return <SelectBox selectBoxHook={selectBoxHook} />
}
```

## 검색 기능

검색 기능을 활성화하려면 `search` 옵션을 `true`로 설정합니다.

```tsx
const selectBoxHook = useSelectBox({
  options: [
    { label: 'apple', value: '사과' },
    { label: 'banana', value: '바나나' },
    { label: 'cherry', value: '체리' },
  ],
  search: true, // 검색 기능 활성화
})
```

## Sizes

선택박스 크기를 조절할 수 있습니다.

```tsx
<SelectBox selectBoxHook={selectBoxHook} size="sm" />
<SelectBox selectBoxHook={selectBoxHook} size="md" />
<SelectBox selectBoxHook={selectBoxHook} size="lg" />
<SelectBox selectBoxHook={selectBoxHook} size="full" />
```

## 커스텀 필터 함수

기본 필터 함수를 커스터마이징할 수 있습니다.

```tsx
const selectBoxHook = useSelectBox({
  options,
  search: true,
  filterFn: (option, term) => {
    // 커스텀 필터 로직
    return option.value.includes(term) || option.label.includes(term)
  },
})
```

## 커스텀 변환 함수

옵션을 문자열로 변환하는 함수를 커스터마이징할 수 있습니다.

```tsx
const selectBoxHook = useSelectBox({
  options,
  itemToString: (option) => `${option.label}: ${option.value}`,
  getValue: (option) => option.label, // value 대신 label 사용
})
```

## useSelectBox Hook

### 반환값

| Property | Type | Description |
|----------|------|-------------|
| `selectedOption` | `SelectBoxOption` | 현재 선택된 옵션 |
| `isOpen` | `boolean` | 드롭다운 열림 상태 |
| `searchValue` | `string` | 검색어 |
| `filteredOptions` | `SelectBoxOption[]` | 필터링된 옵션 목록 |
| `selectedText` | `string` | 표시될 텍스트 |
| `value` | `string` | 선택된 옵션의 value |
| `label` | `string` | 선택된 옵션의 label |
| `hasOption` | `boolean` | 옵션이 선택되었는지 여부 |
| `containerRef` | `RefObject<HTMLDivElement>` | 컨테이너 ref |
| `handleClickOption` | `(option: SelectBoxOption) => void` | 옵션 클릭 핸들러 |
| `handleToggle` | `() => void` | 드롭다운 토글 핸들러 |
| `handleSearch` | `(value: string) => void` | 검색 핸들러 |
| `handleClose` | `() => void` | 드롭다운 닫기 핸들러 |

### 옵션

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `options` | `SelectBoxOption[]` | **필수** | 선택 가능한 옵션 목록 |
| `defaultValue` | `string` | - | 초기 선택값 (uncontrolled) |
| `value` | `string` | - | 현재 선택값 (controlled) |
| `onChange` | `(value: string, option: SelectBoxOption) => void` | - | 선택 변경 핸들러 |
| `search` | `boolean` | `false` | 검색 기능 활성화 |
| `filterFn` | `(option: SelectBoxOption, term: string) => boolean` | 기본 필터 | 커스텀 필터 함수 |
| `itemToString` | `(option: SelectBoxOption) => string` | `opt => opt.value` | 옵션을 문자열로 변환 |
| `getValue` | `(option: SelectBoxOption) => string` | `opt => opt.value` | 옵션의 value 추출 |

## SelectBox Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `selectBoxHook` | `ReturnType<typeof useSelectBox>` | **필수** | useSelectBox hook 반환값 |
| `size` | `'sm' \| 'md' \| 'lg' \| 'full'` | `'full'` | 선택박스 크기 |

## 타입

```tsx
import type { SelectBoxOption } from '@youngduck/yd-ui'

const option: SelectBoxOption = {
  label: 'option1',
  value: '옵션 1',
}
```

## 기능

- ✅ 외부 클릭 시 자동 닫기
- ✅ ESC 키로 닫기
- ✅ 검색 기능 (옵션)
- ✅ Controlled/Uncontrolled 모드 지원
- ✅ 키보드 네비게이션 지원

