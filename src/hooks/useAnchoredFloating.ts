import { useCallback, type CSSProperties, type Ref, type RefCallback } from 'react'
import { autoUpdate, flip, offset, shift, size, useFloating, type Placement } from '@floating-ui/react'

interface UseAnchoredFloatingOptions {
  /** 패널 열림 여부. 열려 있는 동안만 위치를 자동 추적(스크롤/리사이즈 대응)한다. */
  open: boolean
  /** 기준 배치. 공간이 부족하면 flip이 반대편으로 뒤집는다. (기본: 트리거 아래·좌측 정렬) */
  placement?: Placement
  /** 트리거와 패널 사이 간격(px). */
  gap?: number
  /** 뷰포트 가장자리에서 유지할 최소 여백(px). */
  margin?: number
  /** 패널 너비를 트리거 너비에 맞춘다. (셀렉트 드롭다운처럼 트리거와 같은 폭이 필요할 때) */
  matchReferenceWidth?: boolean
  /** 남은 화면 높이에 맞춰 패널 최대 높이를 제한한다. (긴 목록이 화면을 넘기지 않도록) */
  capHeight?: boolean
}

/**
 * 반환 타입을 표준 React 타입으로 정규화한다.
 * (Floating UI 내부 타입이 컴포넌트 공개 타입으로 새어나가 pnpm 경로 참조 에러를 내는 것을 방지)
 */
export interface AnchoredFloating {
  /** 트리거 요소에 연결할 ref 콜백 */
  setReference: RefCallback<HTMLElement>
  /** 떠 있는 패널 요소에 연결할 ref 콜백 */
  setFloating: RefCallback<HTMLElement>
  /** 패널에 그대로 펼칠 위치 스타일(position/top/left 등) */
  floatingStyles: CSSProperties
}

/**
 * 트리거에 붙어서 뜨는 UI(달력 패널, 셀렉트 드롭다운, 향후 툴팁/메뉴 등)의 위치를 계산하는 공통 훅.
 *
 * Floating UI를 얇게 감싸, 뷰포트 경계에서 자동으로 flip(상하·좌우 뒤집기)·shift(안쪽으로 밀어넣기)하고,
 * 필요하면 트리거 너비에 맞추거나(matchReferenceWidth) 남은 높이만큼 최대 높이를 제한한다(capHeight).
 *
 * 사용하는 쪽은 setReference를 트리거에, setFloating + floatingStyles를 패널에 연결한다.
 * 패널 DOM은 트리거 곁(portal 아님)에 남으므로, 각 컴포넌트의 기존 바깥클릭·포커스 로직을 그대로 쓸 수 있다.
 */
export function useAnchoredFloating({
  open,
  placement = 'bottom-start',
  gap = 8,
  margin = 8,
  matchReferenceWidth = false,
  capHeight = false,
}: UseAnchoredFloatingOptions): AnchoredFloating {
  const { refs, floatingStyles } = useFloating({
    open,
    placement,
    // 열려 있는 동안 스크롤·리사이즈·레이아웃 변화에 맞춰 위치를 갱신
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(gap),
      flip({ padding: margin }),
      shift({ padding: margin }),
      size({
        padding: margin,
        apply({ availableHeight, rects, elements }) {
          if (matchReferenceWidth) {
            elements.floating.style.width = `${rects.reference.width}px`
          }
          if (capHeight) {
            elements.floating.style.maxHeight = `${Math.max(0, availableHeight)}px`
          }
        },
      }),
    ],
  })

  return {
    setReference: refs.setReference as RefCallback<HTMLElement>,
    setFloating: refs.setFloating as RefCallback<HTMLElement>,
    floatingStyles,
  }
}

/**
 * 여러 ref(object ref + 콜백 ref)를 하나의 콜백 ref로 합친다.
 * Floating UI의 setReference/setFloating과 우리 컴포넌트의 object ref를 같은 노드에 함께 연결할 때 쓴다.
 */
export function useMergedRef<T>(...refs: Array<Ref<T> | undefined>): RefCallback<T> {
  return useCallback(
    (node: T | null) => {
      for (const ref of refs) {
        if (!ref) continue
        if (typeof ref === 'function') ref(node)
        else (ref as { current: T | null }).current = node
      }
    },
    // ref들은 렌더마다 안정적이라고 가정(Floating UI 콜백 / useRef 결과)
    refs,
  )
}
