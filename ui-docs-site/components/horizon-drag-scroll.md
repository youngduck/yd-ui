# HorizonDragScroll

마우스 드래그로 가로 스크롤할 수 있는 행위(Behavior) 컴포넌트입니다.

[react-indiana-drag-scroll](https://www.npmjs.com/package/react-indiana-drag-scroll) 오픈소스를 분석하여 함수형 컴포넌트로 재구현했습니다.

## 기본 사용법

```tsx
import { HorizonDragScroll } from '@youngduck/yd-ui/HorizonDragScroll'

function App() {
  return (
    <HorizonDragScroll className="gap-4">
      {items.map(item => (
        <div key={item.id} className="shrink-0">
          {item.name}
        </div>
      ))}
    </HorizonDragScroll>
  )
}
```

::: tip
자식 요소에 `shrink-0`을 주어야 가로 스크롤이 정상 작동합니다.
:::

## 클릭 가능한 자식 요소

드래그와 클릭을 자동으로 구분합니다. 5px 이상 이동하면 드래그, 미만이면 클릭으로 판정됩니다.

```tsx
<HorizonDragScroll className="gap-4">
  {items.map(item => (
    <div
      key={item.id}
      className="shrink-0"
      onClick={() => handleClick(item)}
    >
      {item.name}
    </div>
  ))}
</HorizonDragScroll>
```

## 레이아웃 커스터마이징

행위 컴포넌트이므로 `className`으로 레이아웃을 자유롭게 지정합니다.

```tsx
{/* gap, width 등 자유롭게 지정 */}
<HorizonDragScroll className="w-full gap-4 items-center">
  ...
</HorizonDragScroll>
```

## 내장 CSS

아래 스타일은 컴포넌트에 내장되어 있으므로 별도 지정이 필요 없습니다.

| 속성 | 값 | 설명 |
|------|-----|------|
| `display` | `flex` | Flexbox 레이아웃 |
| `flex-direction` | `row` | 가로 배치 |
| `user-select` | `none` | 드래그 시 텍스트 선택 방지 |
| `overflow` | `auto` | 넘침 시 스크롤 |
| scrollbar | 숨김 | 스크롤바 비노출 |

## as prop

렌더링할 HTML 태그를 변경할 수 있습니다.

```tsx
<HorizonDragScroll as="ul" className="gap-4">
  {items.map(item => (
    <li key={item.id} className="shrink-0">{item.name}</li>
  ))}
</HorizonDragScroll>

<HorizonDragScroll as="nav" className="gap-4">
  ...
</HorizonDragScroll>
```

지원 태그: `div`(기본), `ul`, `ol`, `nav`, `section`

## 키보드 지원

컴포넌트에 포커스 시 키보드로 스크롤할 수 있습니다.

| 키 | 동작 |
|-----|------|
| `ArrowLeft` | 왼쪽으로 150px 스크롤 |
| `ArrowRight` | 오른쪽으로 150px 스크롤 |
| `Home` | 맨 앞으로 스크롤 |
| `End` | 맨 뒤로 스크롤 |

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `as` | `'div' \| 'ul' \| 'ol' \| 'nav' \| 'section'` | `'div'` | 렌더링할 HTML 태그 |
| `children` | `React.ReactNode` | **필수** | 스크롤할 자식 요소들 |
| `className` | `string` | - | 추가 CSS 클래스 (width, gap 등) |

HorizonDragScroll은 표준 HTML 요소의 모든 속성을 지원합니다.

## 접근성

- `role="region"`, `aria-label="횡스크롤 영역"` 자동 적용
- `tabIndex={0}`으로 키보드 포커스 가능

## 주요 특징

- 마우스 드래그로 가로 스크롤
- 키보드 네비게이션 지원 (Arrow, Home, End)
- 클릭과 드래그 자동 구분 (activationDistance 5px)
- 스크롤바 자동 숨김
- 이미지 위에서 드래그해도 네이티브 드래그 방지
- 드래그 후 자식 요소 클릭 차단 (캡처 단계 stopPropagation)
- 모바일 터치 스크롤 네이티브 지원 (`overflow: auto`)
