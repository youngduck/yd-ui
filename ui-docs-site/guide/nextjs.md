# Next.js에서 사용하기

App Router에서 YD-UI를 사용하는 설정입니다. React 19.1 이상과 Tailwind CSS 4가 필요합니다. 기존 React 18 / Tailwind 3 프로젝트는 먼저 의존성을 맞춰야 합니다.

::: warning 버전 확인
아래 CSS 설정은 `theme.css`를 제공하는 **0.25.2부터** 적용됩니다. 0.25.1에는 이 export가 없습니다. npm에 해당 버전이 아직 없다면 아래의 로컬 패키지 설치 방법으로 검증하세요.
:::

## 1. 패키지 설치

```bash
npm install @youngduck/yd-ui react@^19.1.0 react-dom@^19.1.0
npm install -D tailwindcss@^4 @tailwindcss/postcss@^4 postcss
# TypeScript 프로젝트
npm install -D @types/react@^19 @types/react-dom@^19
```

React 버전을 올릴 때는 `next-themes` 등 다른 패키지의 React 19 지원도 확인하세요. `--force`나 `--legacy-peer-deps`로 충돌을 숨기기보다 호환 버전으로 맞춥니다.

## 2. PostCSS 설정

프로젝트 루트의 기존 PostCSS 설정을 수정합니다. 여러 설정 파일을 함께 만들지 않습니다.

```js
// postcss.config.mjs
export default {
  plugins: {
    '@tailwindcss/postcss': {},
  },
}
```

CommonJS인 `postcss.config.js`에서는 같은 객체를 `module.exports = { ... }`로 내보냅니다. Tailwind 3의 `tailwindcss` 플러그인, `tailwindcss/nesting`, `postcss-import`는 이 설정으로 교체합니다. v4는 import와 vendor prefix 처리를 포함합니다.

## 3. 전역 CSS와 루트 레이아웃

```css
/* src/app/globals.css */
@import 'tailwindcss';
@import '@youngduck/yd-ui/theme.css';
@import '@youngduck/yd-ui/styles';

/* 프로젝트 스타일은 import 뒤에 작성합니다. */
```

- `theme.css`: Tailwind에 토큰 이름과 YD-UI 유틸리티를 등록하고 배포 JS의 클래스를 스캔합니다.
- `styles`: 실제 토큰 값과 `yds-*` 컴포넌트 CSS를 제공합니다.
- 두 파일 모두 필요합니다. 컴포넌트마다 CSS를 다시 import하지 않습니다.

```tsx
// src/app/layout.tsx — Server Component로 유지합니다.
import './globals.css'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  )
}
```

기존 Tailwind 설정을 유지한다면 `globals.css`에 CSS 파일 기준 상대 경로로 연결합니다.

```css
@config '../../tailwind.config.ts';
```

v4는 JS/TS 설정을 자동으로 읽지 않습니다. 기존 `container` 옵션, 기본 그림자·테두리 변화와 유틸리티 이름 변경은 [Tailwind 업그레이드 가이드](https://tailwindcss.com/docs/upgrade-guide)를 확인하세요. `tailwind-merge`를 쓴다면 v4를 지원하는 3.x로 맞춥니다.

## 4. Client Component에서 사용

현재 배포 번들에는 `'use client'` 지시문이 없습니다. YD-UI를 import하는 컴포넌트에 경계를 명시합니다. 루트 레이아웃 전체를 Client Component로 바꿀 필요는 없습니다.

```tsx
// src/components/yd-ui-example.tsx
'use client'

import { useState } from 'react'
import { Button, MonthPicker } from '@youngduck/yd-ui'

export function YdUiExample() {
  const [month, setMonth] = useState('2026-11')
  const [count, setCount] = useState(0)

  return (
    <div className="flex flex-wrap items-center gap-4 bg-background-primary p-4 text-white">
      <Button onClick={() => setCount(value => value + 1)}>클릭 {count}</Button>
      <MonthPicker value={month} onValueChange={setMonth} />
      <span aria-live="polite">선택한 월: {month}</span>
    </div>
  )
}
```

```tsx
// src/app/page.tsx — Server Component
import { YdUiExample } from '@/components/yd-ui-example'

export default function Page() {
  return <YdUiExample />
}
```

이벤트 함수는 Client Component 안에 둡니다. Server Component에서 `onClick` 같은 함수를 props로 넘기지 않습니다. 빌드된 배포 패키지를 사용하므로 이 구성에는 `transpilePackages`나 `ssr: false`가 필요하지 않습니다.

YD-UI의 기본 surface 토큰은 어두운 색입니다. `next-themes`의 `.dark` 클래스만으로 YD-UI 토큰 전체가 자동 전환되지는 않습니다. 위 예제는 데모 영역에 YD-UI 배경을 명시했습니다.

## 5. 배포 전 로컬 패키지로 검증

형제 폴더에 `yd-ui`와 Next.js 프로젝트가 있을 때:

```bash
# yd-ui 폴더에서
pnpm build
# 소비 프로젝트에 vendor 폴더를 먼저 만듭니다.
npm pack --pack-destination ../my-next-app/vendor

# my-next-app 폴더에서
npm install ./vendor/youngduck-yd-ui-0.25.2.tgz
npm run build
```

tarball은 빌드된 `dist`를 설치하므로 로컬 symlink가 별도의 React를 로드하는 문제를 피할 수 있습니다. `package.json`, lockfile, tarball을 함께 커밋하면 CI에서도 설치할 수 있습니다. 로컬 소스 수정은 자동 반영되지 않으므로 빌드·pack·설치를 다시 해야 합니다. 같은 버전의 파일을 덮어쓰기보다 새 버전/파일명으로 갱신하세요. npm에 정식 배포한 뒤에는 `npm install @youngduck/yd-ui@버전`으로 전환할 수 있습니다.

## 기존 Markdown 표를 YD-UI로 렌더링

`react-markdown`의 `components`에 YD-UI를 매핑하면 기존 `.md`의 표 문법을 그대로 사용할 수 있습니다. 글마다 JSX나 데모 태그를 추가할 필요가 없습니다.

```bash
npm install react-markdown remark-gfm
```

```tsx
'use client'

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Table, THead, TBody, Tr, Th, Td } from '@youngduck/yd-ui/Table'

export function MarkdownBody({ content }: { content: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        table: ({ node: _node, children, ...props }) => (
          <div className="my-8 max-w-full overflow-x-auto">
            <Table {...props} className="w-full table-auto">{children}</Table>
          </div>
        ),
        thead: ({ node: _node, children, ...props }) => <THead {...props}>{children}</THead>,
        tbody: ({ node: _node, children, ...props }) => <TBody {...props}>{children}</TBody>,
        tr: ({ node: _node, children, ...props }) => <Tr {...props}>{children}</Tr>,
        th: ({ node: _node, children, ...props }) => (
          <Th scope="col" {...props} className="min-w-[150px] whitespace-normal break-words overflow-visible text-clip">
            {children}
          </Th>
        ),
        td: ({ node: _node, children, ...props }) => (
          <Td {...props} className="min-w-[150px] whitespace-normal break-words overflow-visible text-clip">
            {children}
          </Td>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  )
}
```

- `remark-gfm`이 일반 Markdown 표를 파싱합니다. 이 용도로 `rehype-raw`나 MDX는 필요하지 않습니다.
- `node`는 Markdown 파서의 내부 데이터이므로 DOM에 전달하지 않습니다.
- `style` 등 나머지 속성은 전달하여 `:---`, `:---:`, `---:`의 셀 정렬을 유지합니다.
- 글에서는 긴 내용을 읽을 수 있도록 기본 말줄임 대신 줄바꿈을 적용합니다. 색상·테두리·셀 여백은 YD-UI 토큰을 사용합니다.
- 가로 스크롤은 표 바깥 래퍼가 담당합니다. 부모가 flex/grid 아이템이라면 그 부모에도 `min-w-0`을 적용해 표가 페이지 전체 너비를 늘리지 않게 합니다.
- `sortable`을 지정하지 않으면 글에 작성한 행 순서가 유지됩니다.

인용문은 `<blockquote>` 안에 `Card`를 배치하고, 코드블록의 복사 버튼은 `Button`으로 교체하는 방식으로 확장할 수 있습니다. 제목·목록처럼 대응 컴포넌트가 없는 요소는 기존 렌더러를 유지합니다.

## 문제 해결

| 증상 | 확인할 설정 |
| --- | --- |
| `useState`, `createContext` 관련 서버 렌더링 오류 | YD-UI를 import하는 파일의 첫 줄에 `'use client'`가 있는지 확인 |
| `theme.css`를 찾지 못함 | 설치 버전과 `package.json` exports 확인. 0.25.1에는 없음 |
| 모양은 있으나 폭·정렬·폰트가 다름 | `theme.css`와 `styles`를 모두 import하고 v4 PostCSS 플러그인을 사용했는지 확인 |
| `Invalid hook call` | `npm ls react react-dom`으로 중복 React 확인. 로컬 링크 대신 tarball 사용 |
| Markdown 표가 일반 텍스트로 표시됨 | `remark-gfm` 등록과 표 헤더 구분선 확인 |
| 모바일에서 표가 화면을 밀어냄 | 표 래퍼의 `overflow-x-auto`와 flex/grid 부모의 `min-w-0` 확인 |

참고: [Next.js의 Client Component 경계](https://nextjs.org/docs/app/api-reference/directives/use-client), [Tailwind v4 업그레이드](https://tailwindcss.com/docs/upgrade-guide).
