# Table

테이블 컴포넌트는 데이터를 행과 열로 표시하는 컴포넌트입니다.

## 기본 사용법

```tsx
import { Table, THead, TBody, Tr, Th, Td } from '@youngduck/yd-ui/Table'

function App() {
  return (
    <Table>
      <THead>
        <Tr>
          <Th>이름</Th>
          <Th>나이</Th>
          <Th>직업</Th>
        </Tr>
      </THead>
      <TBody>
        <Tr>
          <Td>홍길동</Td>
          <Td>30</Td>
          <Td>개발자</Td>
        </Tr>
        <Tr>
          <Td>김철수</Td>
          <Td>25</Td>
          <Td>디자이너</Td>
        </Tr>
      </TBody>
    </Table>
  )
}
```

## 스크롤 가능한 테이블

테이블에 스크롤을 추가하려면 `scrollable` prop을 사용합니다.

```tsx
<Table scrollable scrollClassName="h-64">
  <THead>
    <Tr>
      <Th>이름</Th>
      <Th>나이</Th>
      <Th>직업</Th>
    </Tr>
  </THead>
  <TBody>
    {/* 많은 행들... */}
  </TBody>
</Table>
```

`scrollClassName`은 Tailwind CSS 클래스를 사용하여 스크롤 영역의 크기를 지정합니다.

예시:
- `h-64`: 높이 16rem (256px)
- `w-96`: 너비 24rem (384px)
- `h-[500px]`: 커스텀 높이

## 열 너비 고정 (ColGroup, Col)

`ColGroup`과 `Col` 컴포넌트를 사용하면 각 열의 너비를 Tailwind `className`으로 지정할 수 있습니다.

```tsx
import { Table, ColGroup, Col, THead, TBody, Tr, Th, Td } from '@youngduck/yd-ui/Table'

<Table>
  <ColGroup>
    <Col className="w-[200px]" />
    <Col className="w-[80px]" />
    <Col className="w-[300px]" />
  </ColGroup>
  <THead>
    <Tr>
      <Th>이름</Th>
      <Th>나이</Th>
      <Th>이메일</Th>
    </Tr>
  </THead>
  <TBody>
    <Tr>
      <Td>홍길동</Td>
      <Td>30</Td>
      <Td>hong@example.com</Td>
    </Tr>
  </TBody>
</Table>
```

## 스크롤 + ColGroup 조합

스크롤 테이블에서 열 너비 합계가 컨테이너 너비를 초과하면 가로 스크롤도 자동으로 동작합니다.

```tsx
<Table scrollable={true} scrollClassName="w-[500px] h-[200px]">
  <ColGroup>
    <Col className="w-[180px]" />
    <Col className="w-[80px]" />
    <Col className="w-[300px]" />
    <Col className="w-[120px]" />
    <Col className="w-[150px]" />
  </ColGroup>
  <THead>
    <Tr>
      <Th>이름</Th>
      <Th>나이</Th>
      <Th>이메일</Th>
      <Th>직책</Th>
      <Th>부서</Th>
    </Tr>
  </THead>
  <TBody>
    {/* 행들... */}
  </TBody>
</Table>
```

> 열 너비 합계(830px)가 컨테이너(500px)보다 크므로 가로 스크롤 발생

## 정렬 (오름차순 / 내림차순)

`useTableSort` 훅으로 정렬 상태와 정렬된 데이터를 얻고, `Th` 에 `getSortProps(key)` 를 펼쳐 넣으면 정렬 기능이 붙습니다.

```tsx
import { Table, THead, TBody, Tr, Th, Td, useTableSort } from '@youngduck/yd-ui/Table'

type Member = { name: string; age: number; email: string }

function SortableTable({ members }: { members: Member[] }) {
  const { sortedData, getSortProps } = useTableSort(members, {
    defaultSort: { key: 'name', direction: 'asc' },
  })

  return (
    <Table>
      <THead>
        <Tr>
          <Th {...getSortProps('name')}>이름</Th>
          <Th {...getSortProps('age')}>나이</Th>
          <Th>이메일</Th>
        </Tr>
      </THead>
      <TBody>
        {sortedData.map(member => (
          <Tr key={member.email}>
            <Td>{member.name}</Td>
            <Td>{member.age}</Td>
            <Td>{member.email}</Td>
          </Tr>
        ))}
      </TBody>
    </Table>
  )
}
```

헤더를 클릭하면 **오름차순 → 내림차순 → 오름차순** 순으로 순환합니다. 다른 컬럼을 클릭하면 항상 오름차순부터 시작합니다.
`allowUnsorted: true` 를 주면 **오름차순 → 내림차순 → 정렬 해제** 순환이 됩니다.

정렬 중인 컬럼은 헤더 셀의 화살표 아이콘으로 표시되며, `th` 에 `aria-sort` 속성이 자동으로 붙습니다.
헤더는 `button` 으로 렌더링되므로 키보드(Tab → Enter/Space)로도 정렬할 수 있습니다.

### 정렬 기준 커스터마이징

기본 비교 규칙은 다음과 같습니다.

- 숫자 · boolean · `Date`: 값 크기 순
- 문자열: locale 비교(기본 `ko`, `numeric: true`) — `항목 2` 가 `항목 10` 보다 앞에 옵니다
- 빈 값(`null`, `undefined`): 정렬 방향과 무관하게 항상 마지막

행에서 값을 뽑는 방식을 바꾸려면 `accessors`, 비교 자체를 직접 하려면 `comparators` 를 사용합니다.

```tsx
const { sortedData, getSortProps } = useTableSort(members, {
  // 문자열 날짜를 Date 로 변환해 비교
  accessors: { joinedAt: member => new Date(member.joinedAt) },
  // 직급을 지정한 순서대로 비교 (오름차순 기준)
  comparators: { role: (a, b) => ROLE_ORDER.indexOf(a.role) - ROLE_ORDER.indexOf(b.role) },
  locale: 'ko',
})
```

`Row` 에 없는 파생 키로 정렬할 때는 키 타입을 직접 지정합니다.

```tsx
const { sortedData, getSortProps } = useTableSort<Member, 'name' | 'fullName'>(members, {
  accessors: { fullName: member => `${member.lastName}${member.firstName}` },
})
```

### 서버 정렬 연동

정렬을 서버에서 처리할 때는 `manual: true` 로 데이터 정렬을 끄고, `onSortChange` 로 상태 변경만 받아 사용합니다.

```tsx
const { getSortProps } = useTableSort(rows, {
  manual: true,
  onSortChange: sort => {
    // sort === null 이면 정렬 해제
    refetch({ sortBy: sort?.key, order: sort?.direction })
  },
})
```

정렬 상태를 외부 상태(URL 쿼리 등)로 제어하려면 `sort` prop 을 넘겨 제어 모드로 사용합니다.

```tsx
const [sort, setSort] = useState<SortState<'name' | 'age'>>({ key: 'name', direction: 'asc' })

const { sortedData, getSortProps } = useTableSort(members, { sort, onSortChange: setSort })
```

### 훅 없이 사용하기

`Th` 만으로도 정렬 UI 를 직접 제어할 수 있습니다. `onSortToggle` 은 다음 정렬 방향을 인자로 전달합니다.

```tsx
<Th sortable sortDirection={direction} onSortToggle={next => setDirection(next)}>
  이름
</Th>
```

배열만 정렬하고 싶다면 `sortRows` 유틸을 직접 사용할 수 있습니다.

```tsx
import { sortRows } from '@youngduck/yd-ui/Table'

const sorted = sortRows(members, { direction: 'desc', accessor: member => member.age })
```

## 컴포넌트 구조

Table은 다음 하위 컴포넌트들로 구성됩니다:

- `Table`: 테이블 래퍼
- `ColGroup`: 열 그룹 정의
- `Col`: 개별 열 너비/스타일 지정
- `THead`: 테이블 헤더
- `TBody`: 테이블 본문
- `Tr`: 테이블 행
- `Th`: 테이블 헤더 셀 (`sortable` 로 정렬 헤더로 사용 가능)
- `Td`: 테이블 데이터 셀

## Table Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `scrollable` | `boolean` | `false` | 스크롤 가능 여부 |
| `scrollClassName` | `string` | - | 스크롤 영역 클래스 (scrollable이 true일 때 필수) |
| `className` | `string` | `''` | 추가 CSS 클래스 |

Table은 표준 HTML table 요소의 모든 속성을 지원합니다.

## 사용 예제

### 기본 테이블

```tsx
<Table>
  <THead>
    <Tr>
      <Th>컬럼 1</Th>
      <Th>컬럼 2</Th>
      <Th>컬럼 3</Th>
    </Tr>
  </THead>
  <TBody>
    <Tr>
      <Td>데이터 1</Td>
      <Td>데이터 2</Td>
      <Td>데이터 3</Td>
    </Tr>
  </TBody>
</Table>
```

### 스크롤 가능한 테이블

```tsx
<Table scrollable scrollClassName="h-96">
  <THead>
    <Tr>
      <Th>이름</Th>
      <Th>이메일</Th>
      <Th>전화번호</Th>
    </Tr>
  </THead>
  <TBody>
    {users.map((user) => (
      <Tr key={user.id}>
        <Td>{user.name}</Td>
        <Td>{user.email}</Td>
        <Td>{user.phone}</Td>
      </Tr>
    ))}
  </TBody>
</Table>
```

## 임포트

Table 컴포넌트는 별도 경로에서 임포트해야 합니다:

```tsx
import { Table, ColGroup, Col, THead, TBody, Tr, Th, Td, useTableSort } from '@youngduck/yd-ui/Table'
```

## 타입

```tsx
import type { TableProps, ColGroupProps, ColProps, ThProps, SortDirection, SortState } from '@youngduck/yd-ui/Table'
```

## Col Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | - | Tailwind 클래스로 열 너비 지정 (예: `w-[200px]`, `w-1/4`) |

`Col`은 표준 HTML `col` 요소의 모든 속성을 지원합니다.

## Th Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `sortable` | `boolean` | `false` | 정렬 가능한 헤더 셀로 렌더링 (내부에 버튼 + 화살표 아이콘) |
| `sortDirection` | `'asc' \| 'desc' \| null` | `null` | 현재 이 컬럼의 정렬 방향 (`null` 은 미정렬) |
| `onSortToggle` | `(nextDirection: 'asc' \| 'desc') => void` | - | 헤더 클릭/키보드 입력 시 호출, 다음 정렬 방향 전달 |
| `className` | `string` | - | 추가 CSS 클래스 |

`Th`는 표준 HTML `th` 요소의 모든 속성을 지원합니다.

## useTableSort

```tsx
const result = useTableSort(data, config)
```

### config

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `defaultSort` | `SortState` | `null` | 초기 정렬 상태 (비제어 모드) |
| `sort` | `SortState` | - | 정렬 상태를 외부에서 제어 (제어 모드) |
| `onSortChange` | `(sort: SortState) => void` | - | 정렬 상태 변경 시 호출 |
| `accessors` | `Partial<Record<Key, (row) => value>>` | - | 컬럼별 정렬 값 추출 함수 (기본값 `row[key]`) |
| `comparators` | `Partial<Record<Key, (a, b) => number>>` | - | 컬럼별 비교기 (오름차순 기준, `accessors` 보다 우선) |
| `allowUnsorted` | `boolean` | `false` | `true` 면 오름차순 → 내림차순 → 정렬 해제 순환 |
| `locale` | `string` | `'ko'` | 문자열 비교 locale |
| `manual` | `boolean` | `false` | `true` 면 데이터를 정렬하지 않고 상태만 관리 (서버 정렬) |

### 반환값

| Key | Type | Description |
|-----|------|-------------|
| `sortedData` | `Row[]` | 정렬이 적용된 새 배열 (원본 불변, `manual` 모드에서는 원본 순서) |
| `sortState` | `SortState` | 현재 정렬 상태 (`null` 이면 미정렬) |
| `sortKey` | `Key \| null` | 현재 정렬 중인 컬럼 키 |
| `sortDirection` | `'asc' \| 'desc' \| null` | 현재 정렬 방향 |
| `toggleSort` | `(key: Key) => void` | 해당 컬럼의 정렬을 다음 단계로 순환 |
| `setSort` | `(sort: SortState) => void` | 정렬 상태 직접 지정 |
| `resetSort` | `() => void` | 정렬 해제 |
| `getSortProps` | `(key: Key) => SortableThProps` | `<Th {...getSortProps('name')}>` 형태로 사용하는 헬퍼 |

## 정렬 관련 타입

```tsx
import type {
  SortDirection, // 'asc' | 'desc'
  SortState, // { key: Key; direction: SortDirection } | null
  SortableValue, // string | number | boolean | Date | null | undefined
  SortAccessor, // (row: Row) => SortableValue
  SortComparator, // (a: Row, b: Row) => number
  SortableThProps, // Th 에 펼쳐 넣는 정렬 props
} from '@youngduck/yd-ui/Table'
```

