# Card

카드 컴포넌트는 콘텐츠를 테두리와 패딩으로 감싸 보여주는 컨테이너입니다. card-navy-50 스타일을 사용하며, 디자인 토큰 기반의 border, border-radius, padding이 적용됩니다.

## 기본 사용법

```tsx
import { Card } from '@youngduck/yd-ui'

function App() {
  return <Card>카드 내용</Card>
}
```

## Width & Height

카드 크기는 `className`에 Tailwind 클래스를 전달하여 자유롭게 조정할 수 있습니다.

```tsx
// 너비만 지정
<Card className="w-64">고정 너비 카드</Card>
<Card className="w-full">전체 너비 카드</Card>
<Card className="max-w-md">최대 너비 제한 카드</Card>

// 높이만 지정
<Card className="h-40">고정 높이 카드</Card>
<Card className="min-h-[200px]">최소 높이 카드</Card>

// 너비와 높이 모두 지정
<Card className="w-64 h-40">고정 크기 카드</Card>
<Card className="max-w-lg h-64">반응형 너비, 고정 높이</Card>
```

### 사용 가능한 Tailwind 클래스 예시

- **너비**: `w-64`, `w-full`, `max-w-md`, `max-w-lg`, `min-w-[200px]` 등
- **높이**: `h-40`, `h-full`, `min-h-[200px]`, `max-h-96` 등

## children 활용

`children`에 제목, 본문 등 자유롭게 구성할 수 있습니다.

```tsx
<Card>
  <h3 className="text-yds-s2 text-white mb-2">제목</h3>
  <p className="text-yds-c1m text-white">본문 내용</p>
</Card>
```

## className

Tailwind 등 추가 클래스를 `className`으로 넘길 수 있습니다. width, height뿐만 아니라 정렬, flex 등 모든 Tailwind 유틸리티를 사용할 수 있습니다.

```tsx
<Card className="w-64 mx-auto">가운데 정렬</Card>
<Card className="w-64 h-40">고정 크기 카드</Card>
<Card className="max-w-md w-full mx-auto">반응형 가운데 정렬 카드</Card>
<Card className="min-h-[200px] flex items-center justify-center">내부 컨텐츠 가운데 정렬</Card>
```

## Props

| Prop       | Type           | Default | Description      |
|------------|----------------|---------|------------------|
| `className`| `string`       | `''`    | 추가 CSS 클래스 |
| `children` | `React.ReactNode` | -     | 카드 내용       |

Card는 표준 HTML div 요소의 모든 속성을 지원합니다.
