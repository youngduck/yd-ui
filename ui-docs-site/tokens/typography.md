# Typography Tokens

YD-Design System의 타이포그래피 토큰입니다. `text-yds-*` Tailwind 유틸리티 클래스로 사용합니다.

> 폰트 패밀리: **Wanted Sans Variable** (`--font-yds-wanted`)

## Typography

| 클래스 | font-size | line-height | font-weight |
|--------|-----------|-------------|-------------|
| `text-yds-h1` | 48px | 58px | 600 
| `text-yds-h2` | 40px | 48px | 600 
| `text-yds-s1` | 24px | 30px | 600 
| `text-yds-s2` | 20px | 26px | 600 
| `text-yds-b1` | 18px | 26px | 600 
| `text-yds-b2` | 16px | 24px | 400 
| `text-yds-c1m` | 14px | 16px | 500 
| `text-yds-c1r` | 12px | 16px | 400 
| `text-yds-c2r` | 10px | 14px | 400 

## 사용 예시

```tsx
<h1 className="text-yds-h1">대형 제목</h1>
<h2 className="text-yds-h2">중형 제목</h2>
<p className="text-yds-b2">본문 텍스트</p>
<span className="text-yds-c1m">캡션 텍스트</span>
```

## CSS 변수

직접 CSS 변수를 참조할 수도 있습니다:

```css
font-size: var(--font-size-yds-b2);
line-height: var(--line-height-yds-b2);
font-weight: var(--font-weight-yds-b2);
font-family: var(--font-yds-wanted);
```
