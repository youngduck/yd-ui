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

## 컴포넌트 구조

Table은 다음 하위 컴포넌트들로 구성됩니다:

- `Table`: 테이블 래퍼
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
import { Table, THead, TBody, Tr, Th, Td } from '@youngduck/yd-ui/Table'
```

## 타입

```tsx
import type { TableProps } from '@youngduck/yd-ui/Table'
```

