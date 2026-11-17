# 설치

Next.js App Router 프로젝트는 [Next.js 설정 가이드](./nextjs)를 함께 확인하세요. PostCSS, 전역 CSS, Client Component 경계와 로컬 패키지 검증 방법을 설명합니다.

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


## Tailwind CSS 설정

YD-UI는 Tailwind CSS v4 위에서 동작합니다. 사용하는 프로젝트에 Tailwind를 설치하고, 프로젝트의 CSS 진입 파일에서 YD-UI의 두 CSS를 불러옵니다.

```bash
pnpm add tailwindcss @tailwindcss/vite   # 또는 @tailwindcss/postcss
```

```css
/* 프로젝트의 CSS 진입 파일 (예: src/index.css) */
@import "tailwindcss";
@import "@youngduck/yd-ui/theme.css";  /* Tailwind 에 YD-UI 색·토큰·유틸 등록 */
@import "@youngduck/yd-ui/styles";     /* 토큰 변수 + 컴포넌트 CSS */
```

| 파일 | 내용 | 누가 처리하나 |
|------|------|---------------|
| `@youngduck/yd-ui/theme.css` | `@theme`(색·간격·폰트 이름), `text-yds-*` 등 유틸 정의, 컴포넌트 코드 스캔 경로 | 프로젝트의 Tailwind |
| `@youngduck/yd-ui/styles` | 디자인 토큰(`:root` 변수), `yds-*` 컴포넌트 CSS | 그대로 사용 |

YD-UI는 Tailwind 유틸이나 preflight(리셋 CSS)를 직접 배포하지 않습니다. 유틸은 프로젝트의 Tailwind가 한 번만 생성하므로, `xl:grid-cols-8` 같은 프로젝트의 반응형 클래스를 라이브러리 CSS가 덮어쓰는 일이 없습니다.

::: warning 0.25.1 이하에서 올라오는 경우
예전에는 `@import "@youngduck/yd-ui/styles"` 한 줄만 불러왔습니다. 이제는 `theme.css` 를 함께 불러와야 `text-yds-*`, `bg-background-*` 같은 유틸과 컴포넌트 내부 스타일이 생성됩니다.
:::

## 기본 사용 예제

```tsx
import { Button } from '@youngduck/yd-ui'

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
- Tailwind CSS 4.0.0 이상

