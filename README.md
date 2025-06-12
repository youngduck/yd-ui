# @youngduck/yd-ui

Tailwind CSS와 CVA(Class Variance Authority) 기반의 현대적인 Headless UI 컴포넌트 라이브러리

## ✨ 특징

- **Headless 컴포넌트** - 완전한 스타일링 자유도와 커스터마이징 가능
- **CVA 기반 Variant 시스템** - primary, secondary, ghost 등 다양한 스타일 변형 지원
- **Tailwind CSS 최적화** - 효율적인 클래스 관리와 번들 사이즈 최적화
- **Design Token 동기화** - 피그마 Variables와 자동 동기화
- **완전한 TypeScript 지원** - 타입 안전성과 개발자 경험 향상
- **접근성 중심** - WAI-ARIA 가이드라인 준수
- **트리 쉐이킹** - 사용하는 컴포넌트만 번들에 포함

## 📦 설치

```bash
npm install @youngduck/yd-ui
# 또는
yarn add @youngduck/yd-ui
# 또는
pnpm add @youngduck/yd-ui
```

## 🚀 사용법

### 기본 사용

```tsx
import { Button } from "@youngduck/yd-ui";

export function App() {
  return (
    <div>
      <Button variant="primary" size="md">
        Primary Button
      </Button>
      <Button variant="secondary" size="sm">
        Secondary Button
      </Button>
    </div>
  );
}
```

### Variant 시스템

모든 컴포넌트는 CVA를 활용한 강력한 variant 시스템을 제공합니다:

```tsx
// Button 컴포넌트 variant 예시
<Button variant="primary">주요 버튼</Button>
<Button variant="secondary">보조 버튼</Button>
<Button variant="outline">외곽선 버튼</Button>
<Button variant="ghost">고스트 버튼</Button>
<Button variant="destructive">삭제 버튼</Button>

// 크기 조절
<Button size="sm">작은 버튼</Button>
<Button size="md">보통 버튼</Button>
<Button size="lg">큰 버튼</Button>

// 조합 사용
<Button variant="outline" size="lg" disabled>
  비활성화된 큰 외곽선 버튼
</Button>
```

### 커스텀 스타일링

Headless 설계로 완전한 커스터마이징이 가능합니다:

```tsx
import { Button } from "@youngduck/yd-ui";
import { cn } from "@/lib/utils";

export function CustomButton() {
  return (
    <Button
      variant="ghost"
      className={cn(
        "bg-gradient-to-r from-purple-500 to-pink-500",
        "hover:from-purple-600 hover:to-pink-600",
        "text-white shadow-lg"
      )}
    >
      커스텀 그라데이션 버튼
    </Button>
  );
}
```

## 🎨 Design Token 시스템

피그마 Variables와 동기화된 일관된 디자인 토큰을 제공합니다:

```css
/* 색상 팔레트 */
--primary: 216 100% 50%;
--secondary: 214 32% 91%;
--destructive: 0 85% 60%;
--muted: 210 40% 98%;

/* 타이포그래피 */
--font-sans: "Inter", sans-serif;
--text-sm: 0.875rem;
--text-base: 1rem;
--text-lg: 1.125rem;

/* 간격 시스템 */
--spacing-1: 0.25rem;
--spacing-2: 0.5rem;
--spacing-4: 1rem;
```

## 📖 컴포넌트 카탈로그

### 기본 컴포넌트

- `Button` - 다양한 variant와 크기를 지원하는 버튼
- `Input` - 텍스트 입력 필드
- `Label` - 접근성을 고려한 라벨
- `Badge` - 상태 표시용 배지

### 레이아웃 컴포넌트

- `Card` - 콘텐츠 그룹핑용 카드
- `Separator` - 구분선
- `Container` - 반응형 컨테이너

### 폼 컴포넌트

- `Form` - 폼 래퍼 및 검증
- `Select` - 드롭다운 선택
- `Checkbox` - 체크박스
- `RadioGroup` - 라디오 버튼 그룹

### 피드백 컴포넌트

- `Toast` - 알림 메시지
- `Alert` - 경고 및 정보 표시
- `Progress` - 진행률 표시

## 🛠️ 개발 환경 설정

### Tailwind CSS 설정

`tailwind.config.js`에 다음을 추가하세요:

```js
module.exports = {
  content: [
    "./node_modules/@youngduck/yd-ui/dist/**/*.{js,ts,jsx,tsx}",
    // ... 기타 경로
  ],
  theme: {
    extend: {
      // yd-ui preset이 자동으로 적용됩니다
    },
  },
  plugins: [],
};
```

### TypeScript 설정

완전한 타입 지원을 위한 설정:

```json
{
  "compilerOptions": {
    "moduleResolution": "node",
    "allowSyntheticDefaultImports": true,
    "esModuleInterop": true
  }
}
```

## 🤝 기여하기

기여를 환영합니다! 다음 단계를 따라주세요:

1. 저장소를 포크합니다
2. 기능 브랜치를 생성합니다 (`git checkout -b feature/amazing-feature`)
3. 변경사항을 커밋합니다 (`git commit -m 'Add amazing feature'`)
4. 브랜치에 푸시합니다 (`git push origin feature/amazing-feature`)
5. Pull Request를 생성합니다

## 📝 라이선스

MIT 라이선스 하에 배포됩니다. 자세한 내용은 `LICENSE` 파일을 참조하세요.

## 🔗 링크

- [공식 문서](https://yd-ui.youngduck.dev)
- [Storybook](https://storybook.yd-ui.youngduck.dev)
- [피그마 디자인 시스템](https://figma.com/youngduck-design-system)
- [GitHub](https://github.com/youngduck/yd-ui)

---

**@youngduck/yd-ui**로 더 나은 사용자 경험을 만들어보세요! 🚀
