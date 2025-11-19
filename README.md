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

## 설치 및 사용

```bash
npm install @youngduck/yd-ui
yarn add @youngduck/yd-ui
pnpm add @youngduck/yd-ui
```

## 라이선스

MIT
