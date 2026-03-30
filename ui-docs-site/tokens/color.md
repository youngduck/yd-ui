# Color Tokens

YD-Design System의 색상 토큰 체계입니다. Primitive → Semantic 2단계 구조로 관리됩니다.

## Primitive Colors

디자인 시스템의 원시 색상값입니다. 직접 사용보다는 Semantic Token을 통해 사용하는 것을 권장합니다.

### Primary (Gold)

| 토큰 | 값 | 미리보기 |
|------|-----|---------|
| `--color-primary-50` | `rgb(252, 246, 223)` | 연한 골드 |
| `--color-primary-100` | `rgb(201, 191, 145)` | 중간 골드 |
| `--color-primary-200` | `rgb(253, 230, 138)` | 밝은 골드 |
| `--color-primary-300` | `rgb(236, 203, 67)` | 진한 골드 |
| `--color-primary-400` | `rgb(233, 190, 17)` | 강조 골드 |

### Secondary (Navy)

| 토큰 | 값 |
|------|-----|
| `--color-secondary-50` | `rgb(77, 89, 109)` |
| `--color-secondary-100` | `rgb(52, 58, 70)` |
| `--color-secondary-200` | `rgb(42, 48, 60)` |
| `--color-secondary-300` | `rgb(32, 36, 45)` |
| `--color-secondary-400` | `rgb(25, 25, 31)` |

Opacity 변형(`-opacity`)도 제공합니다 (`rgba` 0.7):

`--color-secondary-50-opacity` ~ `--color-secondary-400-opacity`

### Base

| 토큰 | 값 |
|------|-----|
| `--color-white` | `rgb(255, 255, 255)` |
| `--color-black` | `rgb(0, 0, 0)` |

---

## Semantic Colors

용도별로 의미를 부여한 색상 토큰입니다. 실제 개발 시 이 토큰을 사용하세요.

### Background

| Tailwind 클래스 | 설명 |
|----------------|------|
| `bg-background-primary` | 최상위 배경 (가장 어두움) |
| `bg-background-secondary` | 2단계 배경 |
| `bg-background-tertiary` | 3단계 배경 |
| `bg-background-fourth` | 4단계 배경 |
| `bg-background-fifth` | 5단계 배경 (가장 밝음) |

레이어(투명도 0.7) 변형:

| Tailwind 클래스 |
|----------------|
| `bg-background-primary-layer` |
| `bg-background-secondary-layer` |
| `bg-background-tertiary-layer` |
| `bg-background-fourth-layer` |
| `bg-background-fifth-layer` |

### Text

| Tailwind 클래스 | 설명 |
|----------------|------|
| `text-primary-50` | 연한 골드 텍스트 |
| `text-primary-100` | 중간 골드 텍스트 |
| `text-primary-200` | 밝은 골드 텍스트 |
| `text-primary-300` | 진한 골드 텍스트 |
| `text-primary-400` | 강조 골드 텍스트 |

### Border

| Tailwind 클래스 | 설명 |
|----------------|------|
| `border-primary-50` ~ `border-primary-400` | Primary 계열 테두리 |
| `border-secondary-50` ~ `border-secondary-400` | Secondary 계열 테두리 |

> 모든 border 클래스는 `border-width: 2px`, `border-radius: 8px`가 기본 적용됩니다.

### Z-index

| Tailwind 클래스 | 값 | 용도 |
|----------------|-----|------|
| `z-select-box-dropdown` | `1000` | SelectBox 드롭다운 |
| `z-modal-backdrop` | `1200` | 모달 배경 |
| `z-modal` | `1210` | 모달 컨텐츠 |
