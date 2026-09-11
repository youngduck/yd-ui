# useLayoutEffect & isomorphic layout effect 학습 노트

> 달력 패널 위치 보정(`usePickerDropdown`)에서 `useLayoutEffect` + isomorphic 패턴을 왜 썼는지 정리한 문서.
> 처음 보는 훅이라 개념 → 우리 코드 → 주의점 순서로 공부용으로 남긴다.

> ⚠️ **업데이트(2026-08):** 아래 3번의 손수 짠 `useLayoutEffect` 측정 로직은 이후 **Floating UI(`useAnchoredFloating`)로 대체**되었다.
> 즉 실제 코드에는 더 이상 이 `useLayoutEffect`가 없다. 하지만 "왜 useEffect가 아니라 useLayoutEffect였는가"라는 개념은
> 팝오버/툴팁 포지셔닝의 본질(측정 → 재배치는 paint 전에)을 설명하므로 학습용으로 그대로 둔다.
> Floating UI도 내부적으로는 결국 같은 측정-후-재배치를 하며, 그 위치 갱신을 layout effect 계열로 처리한다. (7번 참고)

---

## 1. 한 줄 요약

- **`useEffect`** = 화면이 **그려진 뒤(after paint)** 비동기로 실행. 대부분의 부수효과는 이걸 쓴다.
- **`useLayoutEffect`** = DOM은 바뀌었지만 화면이 **그려지기 전(before paint)** 동기로 실행. "측정하고 다시 배치"처럼 **깜빡임을 막아야 할 때** 쓴다.
- **isomorphic 패턴** = 서버(SSR)에선 `useLayoutEffect`가 경고를 내므로, 서버에선 `useEffect`, 브라우저에선 `useLayoutEffect`를 쓰도록 갈아끼우는 관용구.

---

## 2. React 렌더링 파이프라인 (타이밍이 핵심)

React가 상태 변화를 화면에 반영하는 순서:

```
1) Render      컴포넌트 함수 실행 → 새 가상 DOM 계산 (아직 화면 변화 없음)
2) Commit      실제 DOM에 변경 반영 (여기서 useLayoutEffect가 "동기로" 실행됨)
   └─ useLayoutEffect 실행  ← DOM은 최신, 화면엔 아직 안 뿌려짐
3) Paint       브라우저가 실제 픽셀을 화면에 그림 (사용자 눈에 보임)
   └─ useEffect 실행        ← 화면에 뿌려진 "뒤"에 비동기로 실행
```

포인트: **`useLayoutEffect`는 2와 3 사이**, **`useEffect`는 3 이후**.
그래서 "DOM 크기를 재서 위치를 고쳐야 하는데, 잘못된 위치가 사용자 눈에 보이면 안 되는" 작업은 반드시 `useLayoutEffect`.

---

## 3. 우리 문제에 대입 (달력 패널)

달력 패널은 `position:absolute; left:0`로 열린다. 트리거가 화면 오른쪽에 있으면 패널이 뷰포트 오른쪽을 넘겨 **가로 스크롤**이 생긴다. 그래서 "패널을 열고 → 폭을 재서 → 넘치면 오른쪽 정렬로 뒤집기"가 필요하다.

만약 이걸 `useEffect`로 하면:

```
Paint에서 왼쪽 정렬(넘친 상태)을 한 번 그림  →  useEffect가 오른쪽 정렬로 수정  →  다시 Paint
                     ↑ 사용자가 "패널이 오른쪽으로 툭 튀는" 깜빡임을 본다
```

`useLayoutEffect`로 하면:

```
Commit에서 DOM 반영 → useLayoutEffect가 측정·정렬 수정(동기) → 그 다음 Paint 한 번
                                                         ↑ 사용자는 처음부터 올바른 위치만 본다 (깜빡임 없음)
```

실제 코드(`src/components/Calendars/hooks/usePickerDropdown.ts`):

```ts
useIsomorphicLayoutEffect(() => {
  if (!isOpen) return

  const container = containerRef.current
  const panel = panelRef.current
  if (!container || !panel) return

  const containerRect = container.getBoundingClientRect()
  const panelWidth = panel.offsetWidth              // ← 렌더된 실제 폭을 "측정"
  const viewportWidth = document.documentElement.clientWidth

  const overflowsRight = containerRect.left + panelWidth > viewportWidth - PANEL_VIEWPORT_MARGIN
  const fitsWhenRightAligned = containerRect.right - panelWidth >= PANEL_VIEWPORT_MARGIN

  setPanelAlign(overflowsRight && fitsWhenRightAligned ? 'right' : 'left')
}, [isOpen])
```

`getBoundingClientRect()`, `offsetWidth` 같은 **측정 API는 브라우저에만 존재**하고, 실제 레이아웃이 끝난 뒤에만 정확한 값이 나온다. 그래서 이 로직은 태생적으로 "commit 이후 / paint 이전"에 실행돼야 한다 → `useLayoutEffect`가 정답.

---

## 4. isomorphic 패턴은 왜 필요한가 (SSR 문제)

우리 컴포넌트는 Next.js(yd-bank)에서 **서버 사이드 렌더링**된다. 그런데:

- 서버에는 화면(레이아웃/픽셀)이 없다. 그래서 `useLayoutEffect`는 서버에서 **아무 일도 못 한다.**
- React는 이 상황을 감지하면 콘솔에 경고를 낸다:
  `Warning: useLayoutEffect does nothing on the server...`

이를 피하는 표준 관용구:

```ts
import { useEffect, useLayoutEffect } from 'react'

// 브라우저면 useLayoutEffect, 서버면 useEffect
const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect
```

동작 원리:

- **서버**: `typeof window === 'undefined'` → `useEffect`로 대체. `useEffect`는 서버에서 실행 자체를 안 하므로 경고도 안 뜬다.
- **브라우저**: `typeof window !== 'undefined'` → 진짜 `useLayoutEffect`. paint 전 동기 실행 → 깜빡임 방지.

> 참고: 우리 케이스에선 패널이 `isOpen`(사용자 클릭)일 때만 렌더되므로 서버에선 패널 DOM 자체가 없다.
> 그래도 훅(`useLayoutEffect` 호출문)은 서버 렌더 시점에 "등록"은 되기 때문에 경고 대상이 된다.
> 그래서 조건이 `isOpen`이든 아니든 isomorphic 패턴을 쓰는 게 안전하다. (react-redux, @react-aria 등 대부분 라이브러리가 이 관용구를 내장한다.)

---

## 5. 언제 무엇을 쓰나 (판단 기준)

| 상황 | 선택 |
|---|---|
| 데이터 fetch, 이벤트 구독, 타이머, 로깅 | `useEffect` (기본값) |
| DOM 크기/위치 **측정** 후 즉시 재배치 | `useLayoutEffect` |
| 툴팁·팝오버·드롭다운 **충돌 회피 배치** | `useLayoutEffect` |
| 스크롤 위치 복원, 포커스 이동(깜빡임 방지) | `useLayoutEffect` |
| 애니메이션 시작 전 초기 스타일 세팅(FLIP) | `useLayoutEffect` |
| SSR 환경에서 위 layout 작업 | **isomorphic 패턴** |

**기본은 항상 `useEffect`.** 화면에 "잘못된 중간 상태가 번쩍"하는 문제가 실제로 있을 때만 `useLayoutEffect`로 승격한다.

---

## 6. 주의점 (함정)

1. **`useLayoutEffect`는 paint를 막는다(blocking).**
   여기서 무거운 연산을 하면 화면이 늦게 그려져 버벅인다. → **측정·배치처럼 가벼운 동기 작업만** 넣을 것. fetch 같은 건 절대 금지.

2. **경고를 끄려고 무조건 isomorphic으로 도배하지 말 것.**
   서버에서 실행될 이유가 없는 순수 client 로직에만 쓴다. 원래 `useEffect`가 맞는 자리(데이터 fetch 등)를 굳이 layout effect로 바꾸는 건 안티패턴.

3. **의존성 배열 주의.**
   우리 코드는 `[isOpen]`만 본다. 창 크기 변경(resize) 중에 패널이 열려 있으면 재계산이 안 된다(현재는 바깥 클릭으로 닫히므로 실사용상 문제 없음). 필요하면 effect 안에서 `resize` 리스너를 붙여 재측정하면 된다.

4. **측정 대상이 DOM에 있어야 한다.**
   `panelRef.current`가 `null`이면(아직 안 열림) 그냥 `return`. 그래서 `if (!panel) return` 가드가 필수.

---

## 7. 더 공부할 키워드

- React 공식: `useLayoutEffect` / `useEffect` 문서의 "before/after paint" 설명
- **CSS Anchor Positioning** (`anchor-name`, `position-try-fallbacks`): JS 측정 없이 브라우저가 스스로 flip/shift 해주는 최신 CSS 기능. (2026 기준 Chrome/Edge만 안정, Safari·Firefox 미지원이라 모바일엔 아직 이르다)
- **Floating UI** (`@floating-ui/react`): 팝오버/툴팁 충돌 회피(flip·shift·size)를 middleware로 자동 처리하는 사실상 업계 표준 라이브러리. 내부적으론 결국 같은 "측정 → 재배치"지만 스크롤·resize·모든 방향 충돌까지 견고하게 처리해준다.
- `useSyncExternalStore` (외부 스토어 구독), FLIP 애니메이션 기법
