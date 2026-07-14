# Spacing & Border Tokens

YD-Design System의 간격 및 테두리 토큰입니다.

## Spacing Scale

4px 단위 원시 간격 스케일입니다. 컴포넌트 사이 간격은 임의의 값 대신 이 스케일에서 선택합니다.

| 토큰 | 값 |
|------|-----|
| `--spacing-1` | `4px` |
| `--spacing-2` | `8px` |
| `--spacing-3` | `12px` |
| `--spacing-4` | `16px` |
| `--spacing-5` | `20px` |
| `--spacing-6` | `24px` |
| `--spacing-8` | `32px` |
| `--spacing-10` | `40px` |
| `--spacing-12` | `48px` |

## Layout Semantic 토큰

Stack / Inline / Field 컴포넌트가 소비하는 용도별 간격 토큰입니다.

| 토큰 | 참조 | 용도 |
|------|------|------|
| `--stack-gap-sm` | spacing-2 (8px) | Stack `gap="sm"` — 밀접한 요소 사이 |
| `--stack-gap-md` | spacing-4 (16px) | Stack `gap="md"` — 기본 수직 간격 |
| `--stack-gap-lg` | spacing-6 (24px) | Stack `gap="lg"` — 폼 필드·섹션 사이 |
| `--inline-gap-sm` | spacing-1 (4px) | Inline `gap="sm"` — 아이콘+텍스트 |
| `--inline-gap-md` | spacing-2 (8px) | Inline `gap="md"` — 기본 수평 간격 |
| `--inline-gap-lg` | spacing-4 (16px) | Inline `gap="lg"` — 버튼 그룹·필터 바 |
| `--field-gap` | spacing-2 (8px) | Field 라벨·입력·메시지 사이 |

## 기본 토큰

| 토큰 | 값 | 설명 |
|------|-----|------|
| `--yds-border-width` | `2px` | 기본 테두리 두께 |
| `--yds-border-radius` | `8px` | 기본 모서리 반경 |
| `--yds-content-padding` | `16px` | 기본 콘텐츠 패딩 |

시맨틱 테두리 색상 토큰(`--color-border-divider` 등)은 [Color 토큰](/tokens/color#border) 페이지를 참고하세요.

## 컴포넌트별 Spacing 토큰

### Button

| 토큰 | 값 |
|------|-----|
| `--button-height` | `48px` |
| `--button-border-radius` | `8px` |

### Table

| 토큰 | 값 |
|------|-----|
| `--table-cell-padding-x` | `16px` |
| `--table-cell-padding-y` | `10px` |
| `--table-cell-height` | `40px` |
| `--table-header-height` | `40px` |

### Modal

| 토큰 | sm | md | lg | xl |
|------|-----|-----|-----|-----|
| width | `320px` | `480px` | `640px` | `800px` |
| height | `400px` | `600px` | `800px` | `900px` |

### CheckBox

| 토큰 | 값 |
|------|-----|
| `--checkbox-wrapper-gap` | `6px` |
| `--checkbox-indicator-size` | `20px` |
| `--checkbox-indicator-inner-size` | `12px` |
| `--checkbox-indicator-border-radius` | `2px` |

### Chips

| 토큰 | 값 |
|------|-----|
| `--chips-height` | `28px` |
| `--chips-padding-x` | `8px` |

## Card 유틸리티 클래스

`border-width: 2px`, `border-radius: 8px`, `padding: 16px`가 기본 적용된 카드 스타일입니다.

| Tailwind 클래스 | 테두리 색상 |
|----------------|------------|
| `card-navy-50` | secondary-50 |
| `card-navy-100` | secondary-100 |
| `card-navy-200` | secondary-200 |
| `card-navy-300` | secondary-300 |
| `card-navy-400` | secondary-400 |
