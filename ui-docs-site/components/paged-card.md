# PagedCard

PagedCard 는 여러 페이지를 담아 우측 상단 dot 클릭으로 좌우 전환하는 카드 컴포넌트입니다. yd-ui `Card`(surface) 위에 헤더(제목 + dot 페이저)와 슬라이드 뷰포트를 얹은 합성(compound) 컴포넌트로, Card 와 동일하게 outlined / filled variant 를 지원합니다.

## 기본 사용법

`PagedCard` 로 감싸고 `PagedCard.Header`(제목) 와 `PagedCard.Page`(각 페이지) 를 자식으로 구성합니다. 크기는 `className`(Tailwind) 으로 지정합니다.

```tsx
import { PagedCard } from '@youngduck/yd-ui/Cards'

function App() {
  return (
    <PagedCard defaultPage={0} className="h-64 w-80">
      <PagedCard.Header>Stages</PagedCard.Header>
      <PagedCard.Page>1 페이지</PagedCard.Page>
      <PagedCard.Page>2 페이지</PagedCard.Page>
      <PagedCard.Page>3 페이지</PagedCard.Page>
    </PagedCard>
  )
}
```

::: warning 직접 자식만 인식됩니다
`PagedCard` 는 **직접 자식** 중 `PagedCard.Header` / `PagedCard.Page` 만 인식합니다. Fragment(`<>...</>`) 나 다른 컴포넌트로 감싼 자식은 렌더되지 않고 무시되며, 개발 모드에서는 콘솔 경고가 출력됩니다. (`.map()` 으로 여러 `PagedCard.Page` 를 펼치는 것은 정상 동작합니다.)
:::

## Variants

Card 표면을 재사용하므로 `variant` 로 outlined / filled 를 선택할 수 있습니다. 기본값은 Card 와 동일하게 `outlined` 입니다.

### Outlined (기본)

```tsx
<PagedCard variant="outlined" className="h-64 w-80">
  <PagedCard.Header>Outlined</PagedCard.Header>
  <PagedCard.Page>outlined 1page</PagedCard.Page>
  <PagedCard.Page>outlined 2page</PagedCard.Page>
</PagedCard>
```

### Filled

```tsx
<PagedCard variant="filled" className="h-64 w-80">
  <PagedCard.Header>Filled</PagedCard.Header>
  <PagedCard.Page>filled 1page</PagedCard.Page>
  <PagedCard.Page>filled 2page</PagedCard.Page>
</PagedCard>
```

## 제어(Controlled) / 비제어(Uncontrolled)

`defaultPage` 로 초기 페이지만 지정하는 비제어 모드, `page` + `onPageChange` 로 외부 상태와 동기화하는 제어 모드를 모두 지원합니다.

```tsx
// 비제어
<PagedCard defaultPage={0} className="h-64 w-80">...</PagedCard>

// 제어
const [page, setPage] = useState(0)

<PagedCard page={page} onPageChange={setPage} className="h-64 w-80">
  <PagedCard.Header>현재: {page + 1}페이지</PagedCard.Header>
  <PagedCard.Page>1</PagedCard.Page>
  <PagedCard.Page>2</PagedCard.Page>
</PagedCard>
```

## 헤더 / dot 페이저

`PagedCard.Header` 는 좌측 제목과 우측 상단 dot 페이저를 배치합니다. `showDots={false}` 로 dot 을 숨길 수 있습니다. 페이지가 1개 이하면 dot 은 자동으로 표시되지 않습니다.

```tsx
<PagedCard.Header showDots={false}>제목만</PagedCard.Header>
```

## Props

### PagedCard

| Prop           | Type                        | Default      | Description                              |
|----------------|-----------------------------|--------------|------------------------------------------|
| `variant`      | `'outlined' \| 'filled'`    | `'outlined'` | 카드 표면 variant                        |
| `page`         | `number`                    | -            | 제어 모드: 현재 페이지 인덱스            |
| `defaultPage`  | `number`                    | `0`          | 비제어 모드: 초기 페이지 인덱스          |
| `onPageChange` | `(index: number) => void`   | -            | 페이지 변경 콜백                         |
| `className`    | `string`                    | -            | 추가 CSS 클래스 (크기 지정 등)           |
| `children`     | `React.ReactNode`           | -            | `PagedCard.Header` / `PagedCard.Page`    |

### PagedCard.Header

| Prop        | Type              | Default | Description                     |
|-------------|-------------------|---------|---------------------------------|
| `showDots`  | `boolean`         | `true`  | 우측 상단 dot 페이저 표시 여부  |
| `children`  | `React.ReactNode` | -       | 제목 영역                       |

### PagedCard.Page

| Prop       | Type              | Default | Description   |
|------------|-------------------|---------|---------------|
| `children` | `React.ReactNode` | -       | 페이지 콘텐츠 |

## 접근성 / 모션

- 페이지 전환은 별도 라이브러리 없이 CSS `transform: translateX` transition 으로 처리됩니다.
- `prefers-reduced-motion: reduce` 환경에서는 전환 애니메이션이 제거됩니다.
- 현재 페이지가 아닌 슬라이드는 `aria-hidden` 처리됩니다.
