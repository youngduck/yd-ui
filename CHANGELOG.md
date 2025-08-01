# Changelog

## [0.1.2] - 2025-01-27

<!-- Tailwind v4버전 업에 따른 마이너버전 업 -->

### 추가

- TailwindCSS v4 완전 호환 지원
- `@tailwindcss/postcss` 플러그인 통합으로 라이브러리 빌드 최적화
- CSS 파일 기반 설정 시스템 (`@theme`, `@import "tailwindcss"`)
- PostCSS 기반 스타일 주입 시스템으로 `inject: true` 설정

### 변경

- TailwindCSS v3.4.1에서 v4.1.11로 메이저 업그레이드
- `tailwind.config.js` 제거 및 CSS 파일 기반 설정으로 마이그레이션
- `@tailwindcss/vite` 의존성 제거 (PostCSS 방식으로 통합)
- Rollup 설정에서 PostCSS 플러그인 설정
- Storybook 설정에서 TailwindCSS v4 호환 적용

### 개선

- CSS 변수 시스템 v4양식에 맞게끔 재구성 (`--color-primary-*`, `--font-size-yds-*`)

### 수정

- ESLint 설정에서 빌드 결과물 및 타입 정의 파일 제외
- Button 컴포넌트의 CSS 변수 참조 오류 수정
- Storybook 무한 로딩 문제 해결
- PostCSS 설정 충돌 문제 해결

### 삭제

- 불필요한 `@tailwindcss/vite` 의존성 제거
- 기존 styled-components 관련 캐싱 파일 제거
- 중복된 TailwindCSS 설정 파일 정리

## [0.0.15] - 2025-01-27

### 추가

- ESLint 및 Prettier 설정 추가
- `lint`, `lint:fix`, `format`, `format:check`, `check` 스크립트 추가
- CSS 모듈 시스템 도입으로 스타일 충돌 방지
- 독립적인 스타일 시스템으로 YD-UI 컴포넌트 스코핑 구현

### 변경

- ESLint flat config 시스템으로 마이그레이션
- 롤업 PostCSS 자동주입설정
- 패키지 이름을 `@yds/yd-ui`에서 `@youngduck/yd-ui`로 복원
- 버전을 0.0.15로 업데이트


## [0.0.10] - 2025-07-31

### 추가

- Tokens Studio for Figma 연동을 위한 자동 토큰 동기화 스크립트 추가
- `auto-token-sync.js` 스크립트로 `tokens.json` → CSS/Tailwind 설정 자동 변환
- `tokens:test` 스크립트로 테스트 파일 생성 기능 추가
- Wanted Sans Variable 폰트 통합 및 YDS 디자인 시스템 타이포그래피 적용
- Toss 패턴 기반 버튼 타이포그래피 시스템 구현

### 변경

- 패키지 이름을 `@youngduck/yd-ui`에서 `@yds/yd-ui`로 변경
- 디자인 토큰 기반 색상 시스템 (Primary 50-400) 적용
- YDS 타이포그래피 토큰 (H1, H2, S1, S2, B1, B2, C1, C2, C3) 적용
- 버튼 컴포넌트에 인라인 CSS 변수를 통한 동적 타이포그래피 적용

### 개선

- 디자인 토큰과 컴포넌트 간 일관성 향상
- Figma Variables와 코드 간 자동 동기화 워크플로우 구축

## [0.0.8] - 2025-06-08

### 추가

- Storybook에 Tailwind CSS 스타일 적용
- Storybook preview에 전역 CSS 불러오기 설정 추가

### 수정

- Storybook에서 컴포넌트 스타일이 보이지 않는 문제 해결

### 삭제

- 테스트로 만든 Input 컴포넌트 제거

## [0.0.7] - 2025-06-08

### 추가

- Tailwind CSS 기반으로 Button 컴포넌트 재구현
- class-variance-authority(cva)를 사용한 variant 시스템 추가
- 시그니처 노란색을 primary 색상으로 추가
- cn() 유틸리티 함수 추가

### 변경

- styled-components에서 Tailwind CSS로 스타일링 방식 변경
- Button 컴포넌트 API 개선 (variant, size, fullWidth 속성 추가)
- 접근성 향상을 위한 aria-label 및 tabIndex 속성 추가

### 삭제

- ButtonStyle.ts 파일 및 styled-components 종속성 제거

## [0.0.6] - 이전 버전

초기 릴리스
