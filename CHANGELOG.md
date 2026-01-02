# Changelog

---

## [0.10.2] - 2026-01-02

**Branch**: `ui-v0.10.2-가이드문서Vercel배포`

### 추가
- chore: vercel.json을 만들어 배포옵션 설정

### 변경
- docs: vitepress 메인화면 워딩수정

### 수정

### 제거

---

## [0.10.1] - 2025-12-31

**Branch**: `ui-v0.10.1-가이드문서추가`

### 추가
- chore: vitepress 설치 및 gitignore추가
- docs: 컴포넌트들 문서화 작업
- docs: v0.10.1작업내용문서

### 변경

### 수정

### 제거

---

## [0.9.1] - 2025-12-19

**Branch**: `ui-v0.9.1-토큰재개편잔여컴포넌트일괄적용`

### 추가

- docs: v0.9.1작업내용문서

### 변경
- refactor: button, checkbox, input컴포넌트 모두 시맨틱토큰 사용하게끔 변경

### 수정
- fix: 버튼 컴포넌트 disabled일때 css indicator loading -> not-alowed로 수정
- fix: Table import경로 yd-ui, yd-ui/Table 두곳에서 둘다 되는 상황 yd-ui/Table에서만 되도록 수정
### 제거

---

**Branch**: `ui-v0.8.1-테이블컴포넌트추가`

### 추가
- feat: 테이블 컴포넌트 개발
    - 스크롤 옵셔널
- feat: Storybook 공통 유틸리티 함수(예시코드 복사기능) 추가 (`src/storybook/utils.ts`)
- docs: v0.8.1작업내용문서

### 변경

### 수정

### 제거

---

## [0.7.1] - 2025-12-10

**Branch**: `ui-v0.7.1-릴리스자동화스크립트추가`

### 추가

- feat: 릴리스 자동화 스크립트 추가 (`scripts/auto-release.js`)
  - 빌드 → 태그 생성 → 태그 푸시 → npm publish 자동화
- docs: v0.7.1작업내용문서
### 변경


### 수정

### 제거

---

## [0.6.1] - 2025-12-10

**Branch**: `ui-v0.6.1-토큰구조재설계`

### 추가

- feat: Checkbox컴포넌트 초안설계
- feat: Checkbox컴포넌트 제작
- docs: v0.6.1작업내용문서

### 변경

- refactor: 토큰재정의

### 수정
## [0.5.2] - 2025-11-19

**Branch**: `ui-v0.5.2-전버전dist미반영이슈`

### 추가

### 변경

### 수정
- 0.5.1버전의 dist폴더의 빌드된 css파일에 yds-button-typography가 그대로 남아있고 yds-button은 없는 현상발견.
- 0.5.2버전으로 올려서 dist폴더가 함께 잘 수정되는지(README수정까지 테스트용으로) 배포를 통한 테스트 진행


### 제거

---
## [0.5.1] - 2025-11-18

**Branch**: `ui-v0.5.1-토큰구조재설계`

### 추가

### 변경
- refactor: 디자인토큰 primitive, semantic, components 재건축
- refactor: button components 토큰명 수정

### 수정

### 제거

---

## [0.4.5] - 2025-11-04

### 추가
- Storybook 크로마틱 자동 배포 세팅
- `env`에 크로마틱 토큰값 추가 
### 수정

## [0.4.4] - 2025-11-04

### 추가
- Storybook Foundation 섹션 추가
  - Colors 페이지: Yellow(primary-50~400), Navy(navy-50~300) 팔레트 및 hex/rgb 값 표시
  - Typography 페이지: Heading, Subtitle, Body, Caption 타이포그래피 토큰 시각화
  - Storybook 섹션 순서 제어 (Foundation → Components)

### 수정
- `.storybook/preview.ts`에 `storySort` 설정 추가로 Foundation 우선 순위 지정


## [0.4.2] - 2025-10-02

### 추가
- husky 설치, 빌드전 검증 추가
- Button 컴포넌트 disabled 상황시 디자인 추가
### 수정
- SelectBox컴포넌트 미사용코드제거

## [0.4.1] - 2025-09-25

### 변경
- 토큰 색상 정의 변경
  - 디자인 시스템 토큰 값 재정의 및 최적화
  - 색상 일관성 개선 및 사용성 향상
- Navy 색상 값 재지정 및 border 모듈화
  - Navy 색상 팔레트 재정의
  - Border 관련 스타일 모듈화로 재사용성 향상

## [0.3.5] - 2025-09-22

### 추가
- SelectBox 선언적 리팩토링 관련 유틸/전략 추가
  - `useDismiss` 훅: 외부 클릭/ESC 닫기 전용 훅 분리
  - `filterFn`, `itemToString`, `getValue` 전략 주입 지원

### 변경
- `useSelectBox` 리팩토링 (선언적/확장성 강화)
  - 파생값을 선언형으로 계산: `filteredOptions`, `selectedText`
  - 컨트롤드/언컨트롤드 동시 지원 (`value`, `onChange` + `defaultValue`는 언컨트롤드 전용)
  - UI 상태를 리듀서로 통합: `isOpen`, `searchValue` + 액션(`OPEN/CLOSE/TOGGLE/SEARCH/RESET_SEARCH`)
  - 닫기 로직 단일화 `handleClose` 사용 및 사이드이펙트 분리(`useDismiss`)
- SelectBox 옵션 리스트 기본 스크롤 제공 (`max-height` 적용)

### 문서
- Devlog 글(`yds-3.md`)에 선언적 리팩토링 기록 추가
  - 파생값 이전, 외부 클릭 훅 분리, 컨트롤드/언컨트롤드 지원, 리듀서 전이 테이블화 정리


## [0.3.4] - 2025-09-18

### 추가
- SelectBox 컴포넌트 추가
  - 기본 드롭다운 선택 기능
  - 검색 기능 지원 (옵션별 활성화/비활성화)
  - 선택된 항목 표시 및 체크 아이콘


### 변경
  - `.text-yds-c1m` (Caption 1 Medium) 폰트크기 변경. 피그마 동기화완료

### 고도화 예정
- Compound Component패턴 + TypeGuard 패턴 활용해서 고도화 해볼예정
- 외부 클릭 시 자동 닫기 방식 검토
- 다양한 사이즈 지원 (sm, md, lg, full)
- 키보드 내비게이션 지원 (Enter, Space, Arrow keys)

## [0.3.2] - 2025-08-29

### 추가
- Input 컴포넌트 추가

## [0.3.1] - 2025-08-28

### 추가
- Input 컴포넌트(초안) 추가
- 투명 레이어용 유틸리티 CSS 추가

### 변경
- React peerDependencies를 19로 상향 (`react`, `react-dom` → ^19.0.0)
- 라이브러리 CSS 전파 방식 정리: Tailwind v4 대응 유틸리티 제공
  - 색상: `.text-primary-50~400`, `.bg-primary-50~400`, `.border-primary-50~400`
  - 타이포그래피: `.text-yds-h1/h2/s1/s2/b1/b2/c1m/c1r/c2r`, `.font-yds-wanted`
- 컴포넌트 베이스 타이포그래피 클래스 정리 (`.yds-button-typography`, `.yds-input-typography`)

## [0.2.1] - 2025-08-27

### 변경

- **패키지 매니저 마이그레이션**: npm에서 pnpm으로 전환
- **개발 환경 개선**: pnpm 기반 의존성 관리로 성능 및 안정성 향상
- **빌드 시스템 최적화**: pnpm의 효율적인 패키지 관리로 빌드 속도 개선

### 개선

- `package-lock.json` 제거 및 `pnpm-lock.yaml` 적용
- pnpm의 심볼릭 링크 시스템으로 디스크 공간 절약
- 의존성 중복 설치 방지로 번들 크기 최적화
- 일관된 패키지 관리 환경 제공 (사이드프로젝트 pnpm 사용중)

## [0.1.4] - 2025-08-05

### 수정

- yd-ui라이브러리 실행시 로컬에서는 적용, 실서버에서는 미적용 현상 최종 해결
  - `rollup-plugin-postcss` 설정에서 `inject: true`와 `extract: 'index.css'` 동시 적용
  - CSS 파일이 JS에 주입되면서 동시에 별도 파일로도 추출되도록 수정
  - `package.json`의 `exports` 필드에 `"./styles": "./dist/index.css"` 추가로 import 경로 커스텀 제공
- 사이드 프로젝트에서 `@import "@youngduck/yd-ui/styles";` 형태로 CSS 간편 import 가능

### 버그 수정

- 개발 환경과 프로덕션 환경 모두에서 YD-UI 적용

## [0.1.3] - 2025-08-04

### 버그 수정

- yd-ui라이브러리 실행시 로컬에서는 적용, 실서버에서는 미적용 현상 발견
    - PostCSS 설정에서 CSS 파일 추출 기능 추가 (`extract: 'index.css'`)
    - `package.json`에서 CSS 파일 배포 설정 추가
    - 빌드 결과물에 CSS 파일이 포함되지 않던 문제 해결
<!-- - 개발 환경과 빌드 환경 간 스타일 적용 불일치 문제 해결 -->

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
