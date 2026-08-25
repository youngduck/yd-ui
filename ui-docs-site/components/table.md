# Table

테이블 컴포넌트는 데이터를 행과 열로 표시하는 컴포넌트입니다. Compound Component 패턴으로 구성되며, 스크롤·열 너비 고정·컬럼 정렬을 지원합니다.

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

## 정렬 (Sorting)

정렬하고 싶은 컬럼의 `Th`에 `sortable` prop 하나만 **선언**하면 됩니다. "이 컬럼은 정렬 가능하다"는 의도만 선언하면, 정렬 상태 관리·값 비교·행 재정렬 같은 동작은 모두 컴포넌트 내부에서 처리합니다. `sorted.map()` 같은 절차를 직접 작성할 필요가 없습니다.

```tsx
<Table>
  <THead>
    <Tr>
      <Th sortable>이름</Th>
      <Th sortable>나이</Th>
      <Th sortable>입사일</Th>
      <Th>이메일</Th>
    </Tr>
  </THead>
  <TBody>
    <Tr>
      <Td>김영덕</Td>
      <Td>28</Td>
      <Td>2023-05-14</Td>
      <Td>youngduck.kim@example.com</Td>
    </Tr>
    <Tr>
      <Td>이민수</Td>
      <Td>32</Td>
      <Td>2021-11-02</Td>
      <Td>minsu.lee@example.com</Td>
    </Tr>
    <Tr>
      <Td>최수진</Td>
      <Td>9</Td>
      <Td>2024-01-08</Td>
      <Td>sujin.choi@example.com</Td>
    </Tr>
  </TBody>
</Table>
```

### 동작 방식

- **3단계 토글**: 헤더 클릭 시 오름차순(`asc`) → 내림차순(`desc`) → 정렬 해제(원본 순서) 순으로 순환합니다.
- **타입 자동 판별**: 해당 컬럼 값들을 보고 숫자 / 날짜 / 문자열 타입을 런타임에 추론합니다. 따라서 `28`, `9` 같은 값도 문자열이 아닌 숫자로 올바르게 정렬됩니다(`"28" < "9"` 버그 없음). 문자열은 한글 로케일(`localeCompare('ko')`) 기준으로 정렬됩니다.
- **Td는 별도 설정 불필요**: `Td`에는 아무것도 추가하지 않아도 됩니다. 셀의 텍스트를 그대로 읽어 정렬합니다.
- **접근성**: 정렬 중인 `Th`에 `aria-sort` 속성이 자동으로 부여됩니다(`ascending` / `descending` / `none`).

> **참고**: 정렬 키는 `Td`의 텍스트 콘텐츠에서 추출합니다. 따라서 셀 안이 순수 텍스트로 추출되지 않는 복잡한 JSX(예: 아이콘만 있는 셀)는 정렬 키가 비어 뒤로 밀립니다.

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

## 컴포넌트 구조

Table은 다음 하위 컴포넌트들로 구성됩니다:

- `Table`: 테이블 래퍼
- `ColGroup`: 열 그룹 정의
- `Col`: 개별 열 너비/스타일 지정
- `THead`: 테이블 헤더
- `TBody`: 테이블 본문
- `Tr`: 테이블 행
- `Th`: 테이블 헤더 셀
- `Td`: 테이블 데이터 셀

## Table Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `scrollable` | `boolean` | `false` | 스크롤 가능 여부 |
| `scrollClassName` | `string` | - | 스크롤 영역 클래스 (scrollable이 true일 때 필수) |
| `className` | `string` | `''` | 추가 CSS 클래스 |

Table은 표준 HTML table 요소의 모든 속성을 지원합니다.

## Th Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `sortable` | `boolean` | `false` | 이 컬럼의 정렬 기능 활성화 여부. `true`면 헤더 클릭으로 정렬됩니다. |
| `className` | `string` | - | 추가 CSS 클래스 |

`Th`는 표준 HTML `th` 요소의 모든 속성을 지원합니다.

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
import { Table, ColGroup, Col, THead, TBody, Tr, Th, Td } from '@youngduck/yd-ui/Table'
```

## 타입

```tsx
import type { TableProps, ThProps, ColGroupProps, ColProps, SortDirection } from '@youngduck/yd-ui/Table'
```

`SortDirection`은 정렬 방향 타입입니다: `'asc' | 'desc' | null`

## Col Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | - | Tailwind 클래스로 열 너비 지정 (예: `w-[200px]`, `w-1/4`) |

`Col`은 표준 HTML `col` 요소의 모든 속성을 지원합니다.

