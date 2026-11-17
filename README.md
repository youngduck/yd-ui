
<img width="1359" height="913" alt="Frame 1" src="https://github.com/user-attachments/assets/0624b108-c499-48ae-993b-a86811a5de51" />

# @youngduck/yd-ui


YD-Design System 기반의 Tailwind CSS와 CVA(Class Variance Authority)를 활용한 UI 컴포넌트 라이브러리

## 기술 스택

- **프레임워크**: React 19.1.0, TypeScript 5.7.2
- **스타일링**: Tailwind CSS 4.1.11, CVA 0.7.1, PostCSS 8.5.6
- **빌드 도구**: Rollup 4.29.1, Babel 7.26.0
- **문서화**: Storybook 8.4.7, Chromatic 13.3.3 (시각적 회귀 테스트)
- **코드 품질**: ESLint 9.32.0, Prettier 3.6.2, Husky 9.1.7 (Git hooks)
- **아이콘**: Lucide React 0.542.0

## 주요 특징

- **YD-Design System 기반**: 디자인 토큰(yds-xxxx) 적용
- **CVA 기반 Variant 시스템**: 타입 안전한 variant 관리 (fill, outlined, size, color)
- **완전한 TypeScript 지원**: 모든 컴포넌트와 hook 타입 정의 제공
- **커스터마이징 가능**: className prop을 통한 스타일 확장 지원
- **트리 쉐이킹**: 사용하는 컴포넌트만 번들에 포함
- **접근성**: WAI-ARIA 가이드라인 준수 (aria-label, tabIndex)
- **번들 최적화**: Rollup 기반 ESM/CJS 듀얼 포맷, PostCSS로 CSS 단일 파일 번들링


## 제공 컴포넌트

- **Button**: variant(fill, outlined), size(sm, md, lg, full), color(primary), disabled 지원
- **Input**: variant(search, input), size(sm, md, lg, full), color(white, primary-400, primary-100), disabled 지원, Search 아이콘 포함
- **SelectBox**: size(sm, md, lg, full), `useSelectBox` hook 필수, controlled/uncontrolled 모드, 검색 기능, 외부 클릭/ESC 닫기
- **CheckBox**: 기본 체크박스 컴포넌트
- **Card**: 컨테이너 카드 컴포넌트, className 커스터마이징 지원
- **Chips**: variant(fill, outlined), color(primary), 태그/뱃지 형태 컴포넌트
- **Table**: Compound Component 패턴 (Table, ColGroup, Col, THead, TBody, Tr, Th, Td), 세로/가로 스크롤 지원, sticky 헤더 자동 처리
- **Overlays**: `OverlayProvider` + `useOverlay` hook 기반 모달 시스템, size(sm, md, lg, full) 지원

## 설치 및 사용

```bash
npm install @youngduck/yd-ui
yarn add @youngduck/yd-ui
pnpm add @youngduck/yd-ui
```

YD-UI는 Tailwind CSS v4 위에서 동작합니다. 사용하는 프로젝트에 Tailwind를 설치합니다 (`react`·`react-dom` 19.1 이상, `tailwindcss` 4 이상이 peer dependency).

```bash
pnpm add tailwindcss @tailwindcss/vite   # Next.js 는 @tailwindcss/postcss
```

프로젝트의 CSS 진입 파일에서 아래 세 줄을 **이 순서대로** 불러옵니다.

```css
/* 예: src/index.css */
@import "tailwindcss";
@import "@youngduck/yd-ui/theme.css";  /* Tailwind 에 YD-UI 색·토큰·유틸 등록 */
@import "@youngduck/yd-ui/styles";     /* 토큰 변수 + 컴포넌트 CSS */
```

| 파일 | 내용 |
|------|------|
| `@youngduck/yd-ui/theme.css` | `@theme`(색·간격·폰트 이름), `text-yds-*` 등 유틸 정의, 컴포넌트 코드 스캔 경로. 프로젝트의 Tailwind 가 처리 |
| `@youngduck/yd-ui/styles` | 디자인 토큰(`:root` 변수), `yds-*` 컴포넌트 CSS |

> **0.25.1 이하에서 올라오는 경우**
> 0.25.2 부터 Tailwind 유틸이 배포 CSS(`styles`)에서 빠지고 `theme.css` 로 나뉘었습니다.
> 예전처럼 `styles` 한 줄만 불러오면 `text-yds-*`, `bg-background-*` 같은 유틸과 컴포넌트 내부 스타일이 생성되지 않으니 `theme.css` 를 꼭 추가하세요.
> 이 분리로 라이브러리 CSS 가 프로젝트의 반응형 클래스(예: `xl:grid-cols-8`)를 덮어쓰던 문제가 사라졌습니다.

```tsx
import { Button } from '@youngduck/yd-ui'

function App() {
  return (
    <Button variant="fill" size="md" color="primary">
      클릭하세요
    </Button>
  )
}
```

자세한 설정과 컴포넌트 문서는 [문서 사이트](https://yds-yd-ui.vercel.app)를 참고하세요.

- [설치 가이드](https://yds-yd-ui.vercel.app/guide/installation.html)
- [Next.js 가이드](https://yds-yd-ui.vercel.app/guide/nextjs.html)

## 라이선스

MIT
