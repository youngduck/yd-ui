# Changelog

모든 주요 변경 사항이 이 파일에 기록됩니다.

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
