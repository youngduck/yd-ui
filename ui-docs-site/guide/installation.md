# 설치

## 패키지 설치

npm, yarn, pnpm 중 하나를 사용하여 설치할 수 있습니다.

```bash
npm install @youngduck/yd-ui
```

```bash
yarn add @youngduck/yd-ui
```

```bash
pnpm add @youngduck/yd-ui
```


## 기본 사용 예제

```tsx
import { Button } from '@youngduck/yd-ui'
import '@youngduck/yd-ui/styles'

function App() {
  return (
    <div>
      <Button variant="fill" size="md" color="primary">
        클릭하세요
      </Button>
    </div>
  )
}
```

## TypeScript 지원

이 라이브러리는 완전한 TypeScript 지원을 제공합니다. 타입 정의는 자동으로 포함되어 있습니다.

## 요구사항

- React 19.1.0 이상
- React DOM 19.1.0 이상

