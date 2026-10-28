# Accordion

Accordion 컴포넌트는 헤더를 눌러 본문을 펼치고 접는 목록입니다. Card 와 동일하게 `outlined` / `filled` 두 가지 variant 로 영역을 구분하며, 펼쳐진 헤더는 노란(primary) 글자와 180도 회전한 화살표로 강조됩니다. FAQ, 약관 요약, 상세 정보 접기처럼 정보를 필요할 때만 펼쳐 보여주는 UI에 적합합니다. 펼침 상태는 기본적으로 컴포넌트가 직접 관리하며, 바깥에서 그 상태를 읽거나 바꿔야 할 때만 `value` / `onValueChange` 로 제어합니다.

## 기본 사용법

```tsx
import { Accordion } from '@youngduck/yd-ui'

function App() {
  return (
    <Accordion
      items={[
        {
          label: '배송은 얼마나 걸리나요?',
          value: 'delivery',
          content: <p>영업일 기준 2~3일 소요됩니다.</p>,
        },
        {
          label: '교환·반품이 가능한가요?',
          value: 'return',
          content: <p>수령 후 7일 이내 가능합니다.</p>,
        },
      ]}
    />
  )
}
```

펼쳐진 값은 **배열**로 다룹니다. `type="single"` 이어도 배열입니다. 값의 형태가 `type` 에 따라 달라지지 않으므로 두 모드를 오갈 때 코드를 고치지 않아도 됩니다.

## 비제어와 제어

아코디언의 펼침 상태는 대부분 **그 아코디언 안에서만 쓰입니다.** 그래서 기본은 비제어이고, 처음 펼쳐둘 항목만 `defaultValue` 로 주면 됩니다.

```tsx
// 처음부터 '배송' 항목만 펼친 채로 시작
<Accordion defaultValue={['delivery']} items={items} />
```

펼침 상태를 **아코디언 바깥에서 읽거나 직접 바꿔야 할 때만** `value` / `onValueChange` 를 줍니다.

```tsx
// 펼친 항목을 다른 영역에 표시하거나, URL·서버와 맞춰야 하는 경우
const [value, setValue] = useState<string[]>(['delivery'])

return (
  <>
    <Accordion value={value} onValueChange={setValue} items={items} />
    <p>펼쳐진 항목: {value.join(', ')}</p>
  </>
)
```

::: tip 어느 쪽인지 판단하는 기준
useState 로 만든 값이 `<Accordion>` 에 돌려주는 것 말고 **아무 데도 쓰이지 않는다면** 제어가 필요 없는 경우입니다.
`defaultValue` 로 바꾸면 그 useState 는 그대로 사라집니다.
:::

`onValueChange` 는 비제어 모드에서도 호출되므로, 상태를 넘기지 않고 변경 알림만 받을 수도 있습니다.

## 주요 특징

- **비제어 기본**: `defaultValue` 로 처음 펼칠 항목만 지정하면 펼침 상태는 컴포넌트가 직접 관리합니다.
- **필요할 때만 제어**: `value` / `onValueChange` 를 주면 펼침 상태를 바깥에서 관리합니다.
- **items 기반**: `{ label, value, content, disabled? }` 배열로 구성합니다.
- **single / multiple**: `type` 으로 한 번에 하나만 펼칠지, 여러 개를 펼칠지 선택합니다.
- **펼침 강조**: 펼쳐진 헤더는 노란(primary-400) 글자 + 180도 회전한 화살표로 표시됩니다.
- **구분선**: 항목 사이에만 `--color-border-divider` 토큰의 구분선이 들어갑니다. (마지막 항목 아래에는 선이 없습니다)
- **variant 지원**: Card 와 같은 `outlined`(테두리) / `filled`(배경) 체계 (기본값 outlined)
- **지연 로딩**: `lazy` 로 펼치기 전까지 본문 렌더를 미룸 (본문이 쿼리를 들고 있을 때 필수)
- **접근성**: WAI-ARIA Accordion 패턴, 방향키·Home·End 키보드 탐색
- **디자인 토큰**: 색상·간격·타이포그래피를 모두 토큰에서 일괄 적용

## type

`type` prop으로 동시에 펼칠 수 있는 항목 수를 결정합니다.

```tsx
// single (기본): 하나를 펼치면 나머지가 닫힙니다. FAQ처럼 한 번에 하나만 읽는 곳에 적합합니다.
<Accordion type="single" items={items} />

// multiple: 여러 항목을 동시에 펼칠 수 있습니다. 항목끼리 비교해야 할 때 적합합니다.
<Accordion type="multiple" items={items} />
```

## Variants

Card 와 같은 체계입니다. `variant` prop으로 영역을 구분하는 방식을 선택합니다. 색상 토큰 값도 Card 와 동일하게 맞춰져 있어 같은 화면에 나란히 두어도 이질감이 없습니다.

```tsx
// outlined (기본) — 테두리로 영역을 구분
<Accordion variant="outlined" items={items} />

// filled — 배경색으로 영역을 구분
<Accordion variant="filled" items={items} />
```

헤더 **최소** 높이는 48px 입니다. Button·Input·Calendar 트리거와 같은 표준 컨트롤 높이라 한 줄짜리 라벨은 폼 안에 섞어 배치해도 줄이 맞고,
`label` 에 여러 줄 JSX 를 넣으면 내용만큼 늘어납니다.

## 항목 비활성화

특정 항목만 비활성화하려면 해당 항목에 `disabled: true` 를 지정합니다. 비활성화된 항목은 클릭·키보드 탐색에서 자동으로 제외됩니다.

```tsx
<Accordion
  items={[
    { label: '배송 안내', value: 'delivery', content: <p>영업일 기준 2~3일</p> },
    { label: '준비 중입니다', value: 'soon', content: <p>-</p>, disabled: true },
  ]}
/>
```

## 제목 레벨 지정

아코디언 헤더는 문서의 제목 구조에 포함됩니다. 주변 구조에 맞는 레벨을 `headingLevel` 로 지정하면 스크린리더 사용자가 제목 목록으로 탐색할 때 흐름이 자연스러워집니다. (기본값 `3`)

```tsx
<h2>자주 묻는 질문</h2>

{/* h2 아래에 오므로 헤더는 h3 (기본값) */}
<Accordion items={items} />

{/* 페이지 최상위 섹션이라면 h2 로 올립니다 */}
<Accordion headingLevel={2} items={items} />
```

## 본문에 임의의 JSX 넣기

`content` 는 `ReactNode` 이므로 목록·표 등 어떤 JSX든 넣을 수 있습니다.

```tsx
<Accordion
  type="multiple"
  items={[
    {
      label: '이용약관 요약',
      value: 'terms',
      content: (
        <ul>
          <li>만 14세 이상만 가입할 수 있습니다.</li>
          <li>계정을 타인에게 양도할 수 없습니다.</li>
        </ul>
      ),
    },
  ]}
/>
```

## 키보드 접근성

Accordion은 WAI-ARIA Accordion 패턴을 따릅니다.

| 키 | 동작 |
|----|------|
| `Tab` | 다음 헤더로 이동 (모든 헤더가 탭 순서에 포함됨) |
| `Enter` / `Space` | 포커스된 항목 펼치기 / 접기 |
| `↑` | 이전 헤더로 포커스 이동 (비활성 항목 건너뜀, 순환) |
| `↓` | 다음 헤더로 포커스 이동 (비활성 항목 건너뜀, 순환) |
| `Home` | 첫 번째 헤더로 포커스 이동 |
| `End` | 마지막 헤더로 포커스 이동 |

::: tip Tabs와 다른 점
Tabs는 로빙 탭인덱스를 써서 선택된 탭 하나만 `Tab` 으로 접근할 수 있지만, Accordion은 **모든 헤더가 `Tab` 으로 접근 가능**합니다. 탭은 "여러 개 중 하나를 고르는" 단일 위젯이지만, 아코디언 헤더는 각각이 독립적인 펼침 버튼이기 때문입니다. (WAI-ARIA APG 권고)
:::

접힌 본문은 `visibility: hidden` 으로 처리되므로 접근성 트리와 탭 순서에서도 함께 제외됩니다. 접힌 상태의 링크·버튼에 `Tab` 으로 잘못 진입하는 일이 없습니다.

## 본문을 펼칠 때만 불러오기 (lazy)

Accordion 은 높이 전환을 위해 접힌 본문도 DOM 에 남겨둡니다. 본문이 **자기 데이터를 직접 불러오는 경우**(차트, 상세 조회 등)
이 기본 동작은 항목 수만큼의 요청이 **마운트 즉시 한꺼번에** 나가는 문제를 만듭니다. 30개 항목이면 요청 30개입니다.

`lazy` 를 주면 한 번도 펼쳐진 적 없는 본문은 렌더하지 않습니다.

```tsx
<Accordion
  lazy
  items={matches.map(match => ({
    value: match.id,
    label: <MatchHeader match={match} />,
    // 이 쿼리는 해당 항목을 처음 펼칠 때 비로소 나간다
    content: <MatchDetailChart matchId={match.id} />,
  }))}
/>
```

::: tip 한 번 펼친 본문은 남깁니다
접을 때 언마운트하지 않습니다. 접었다 펼 때마다 같은 데이터를 다시 불러오는 것을 막기 위함이고,
덕분에 두 번째 펼침부터는 높이 전환도 끊기지 않습니다.
:::

## 접기/펼치기 애니메이션

본문 높이 전환은 CSS grid 로 처리합니다. `grid-template-rows` 를 `0fr → 1fr` 로 전환하면 **내용 높이를 JS로 측정하지 않고도** "내용만큼"의 높이를 애니메이션할 수 있습니다.

`prefers-reduced-motion: reduce` 를 설정한 사용자에게는 전환 애니메이션이 제거됩니다.

## Props

| Prop            | Type                              | Default    | Description                                  |
|-----------------|-----------------------------------|------------|----------------------------------------------|
| `items`         | `AccordionItem[]`                 | -          | 아코디언 항목 목록 (필수)                    |
| `defaultValue`  | `string[]`                        | `[]`       | 처음부터 펼쳐둘 값 목록 (비제어 모드)        |
| `value`         | `string[]`                        | -          | 현재 펼쳐진 값 목록. 주면 제어 모드가 된다   |
| `onValueChange` | `(value: string[]) => void`       | -          | 값 변경 시 호출되는 콜백 (두 모드 모두 호출) |
| `type`          | `'single' \| 'multiple'`          | `'single'` | 동시에 펼칠 수 있는 항목 수                  |
| `variant`       | `'outlined' \| 'filled'`          | `'outlined'` | 영역 구분 방식 (테두리 / 배경)             |
| `headingLevel`  | `2 \| 3 \| 4 \| 5 \| 6`            | `3`        | 헤더에 사용할 제목 레벨                      |
| `lazy`          | `boolean`                         | `false`    | 펼치기 전까지 본문을 렌더하지 않음           |

`AccordionItem` 타입은 다음과 같습니다.

```ts
type AccordionItem = {
  label: ReactNode // 헤더에 노출되는 라벨. 문자열뿐 아니라 임의의 JSX 도 가능
  value: string // 열림 상태를 식별하는 고유 값
  content: ReactNode // 펼쳐졌을 때 보여줄 본문
  disabled?: boolean // 개별 항목 비활성화 여부
}
```

Accordion은 표준 HTML div 요소의 속성(`onChange` 제외)을 함께 지원합니다.

## 디자인 토큰

Accordion 컴포넌트는 다음 디자인 토큰을 사용합니다.

### Spacing Tokens
- `--accordion-border-radius`: 컨테이너 모서리 반경
- `--accordion-trigger-height`: 헤더 최소 높이 (48px, 표준 컨트롤 높이)
- `--accordion-trigger-padding-y`: 헤더 상하 패딩 (8px, 여러 줄 라벨에서만 실제로 쓰임)
- `--accordion-trigger-padding-x`: 헤더 좌우 패딩 (16px)
- `--accordion-trigger-gap`: 라벨과 화살표 사이 간격 (12px)
- `--accordion-panel-padding-x`: 본문 좌우 패딩 (16px)
- `--accordion-panel-padding-y`: 본문 상하 패딩 (12px)
- `--accordion-icon-size`: 화살표 아이콘 크기 (20px)
- `--accordion-transition-duration`: 펼침/접힘 전환 시간 (0.25s)

### Typography Tokens
- `--accordion-trigger-typography-*`: 헤더 폰트 (yds-b2)
- `--accordion-panel-typography-*`: 본문 기본 폰트 (yds-c1r)
- `--accordion-*-typography-font-family`: Wanted Sans Variable

### Color Tokens
- `--color-accordion-outlined-border`: outlined 테두리 색상 (secondary-50, Card outlined 와 동일)
- `--color-accordion-filled-bg`: filled 배경색 (background-secondary, Card filled 와 동일)
- `--color-accordion-divider`: 항목 사이 구분선 색상 (border-divider, Table 구분선과 공유)
- `--color-accordion-trigger-text`: 헤더 텍스트 색상 (white)
- `--color-accordion-trigger-text-hover`: 헤더 hover 텍스트 색상 (primary-200)
- `--color-accordion-trigger-text-expanded`: 펼쳐진 헤더 텍스트 색상 (primary-400, 노란색)
- `--color-accordion-icon`: 화살표 아이콘 색상 (primary-100)
- `--color-accordion-panel-text`: 본문 텍스트 색상 (primary-100)
- `--color-accordion-focus-ring`: 포커스 링 색상 (white)
