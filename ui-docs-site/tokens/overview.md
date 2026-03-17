# 디자인 토큰

디자인 토큰은 색상, 타이포그래피, 간격 등의 스타일 속성을 변수로 정의하여 코드화한 것입니다.
YD-Design System은 **Primitive → Semantic → Component** 3단계 계층 구조로 토큰을 관리합니다.

---

## 토큰 계층 구조

```
Primitive Token
    ↓ 참조
Semantic Token
    ↓ 참조
Component Token
```

### Primitive Token

디자인 시스템의 가장 기본이 되는 원시 값입니다.
색상의 실제 HEX/RGB 값, 폰트 크기, 굵기 등 **"무엇인가"** 를 정의합니다.

```css
/* token.primitive.css */
--color-primary-400: #e9be11;
--color-secondary-300: rgb(32, 36, 45);
--font-size-yds-b2: 16px;
```

> Primitive Token은 직접 사용하지 않습니다. Semantic Token을 통해 참조합니다.

---

### Semantic Token

Primitive Token을 참조하여 **용도와 의미**를 부여한 토큰입니다.
"어디에 쓰이는가"를 표현하며, 디자이너와 개발자가 같은 언어로 소통할 수 있게 합니다.

```css
/* token.semantic.css */
--color-background-primary: var(--color-secondary-400);   /* 최상위 배경 */
--color-border-primary-deep: var(--color-primary-400);    /* 강조 테두리 */
--color-font-primary-deep: var(--color-primary-400);      /* 강조 텍스트 */
```

Tailwind 유틸리티 클래스로도 제공됩니다:

```tsx
<div className="bg-background-primary text-primary-400">...</div>
```

---

### Component Token

Semantic Token을 참조하여 **특정 컴포넌트에 종속된** 토큰입니다.
버튼, 테이블, 모달 등 각 컴포넌트의 고유한 스타일 값을 정의합니다.

```css
/* token.components/token.components.button.css */
--color-button-fill-primary-bg: var(--color-background2-primary-deep);
--color-button-fill-primary-text: var(--color-black);
--button-height: 48px;
```

---

## 설계 의도

### 1. 변경의 영향 범위 최소화

특정 색상을 바꿔야 할 때, Primitive Token 하나만 수정하면 이를 참조하는 모든 Semantic/Component Token에 자동으로 반영됩니다.
개별 컴포넌트를 일일이 수정하지 않아도 됩니다.

### 2. 디자이너와 개발자의 공통 언어

`#e9be11` 대신 `color-primary-400`, `bg-background-primary` 같은 의미 있는 이름을 사용합니다.
피그마의 색상 변수와 코드의 CSS 변수가 같은 이름을 공유하므로 협업 시 혼선을 줄입니다.

### 3. 다크모드/테마 확장 대비

Semantic Token 계층이 존재하기 때문에, 추후 다크모드나 다른 테마를 도입할 때 Primitive Token 값만 교체하면 전체 시스템에 적용됩니다.

### 4. 컴포넌트 독립성

Component Token이 분리되어 있어, 특정 컴포넌트의 스타일을 변경해도 다른 컴포넌트에 영향을 주지 않습니다.

---

## 파일 구조

```
src/styles/
├── token.primitive.css          # Primitive: 원시 색상, 폰트 크기 등
├── token.semantic.css           # Semantic: 배경, 테두리, 텍스트 등 용도별 토큰
└── token.components/
    ├── token.components.button.css
    ├── token.components.card.css
    ├── token.components.checkbox.css
    ├── token.components.chips.css
    ├── token.components.input.css
    ├── token.components.modal.css
    └── token.components.table.css
```
