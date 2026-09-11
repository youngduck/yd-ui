import { useEffect, useRef, useState, type CSSProperties, type RefCallback, type RefObject } from 'react'
import { useAnchoredFloating, useMergedRef } from '../../../hooks/useAnchoredFloating'

// 로빙 탭인덱스(-1) 셀은 제외하고 실제 Tab 으로 이동 가능한 요소만 선택
const TABBABLE_SELECTOR = 'button:not([disabled]):not([tabindex="-1"])'

interface PickerDropdown {
  isOpen: boolean
  /** 바깥 클릭 판정용 컨테이너(트리거+패널을 감싸는 wrapper) ref */
  containerRef: RefObject<HTMLDivElement | null>
  /** 트리거 버튼에 연결할 ref */
  setTriggerRef: RefCallback<HTMLButtonElement>
  /** 패널에 연결할 ref */
  setPanelRef: RefCallback<HTMLDivElement>
  /** 패널에 그대로 펼칠 위치 스타일 */
  panelStyle: CSSProperties
  toggle: () => void
  close: (focusTrigger?: boolean) => void
  handlePanelKeyDown: (event: React.KeyboardEvent<HTMLDivElement>) => void
}

/**
 * 달력 피커 공통 드롭다운 훅.
 * 패널 열림/닫힘 상태와 바깥 클릭·Escape 닫기를 담당하고,
 * 키보드로 닫을 때는 트리거로 포커스를 복귀시킵니다.
 * 패널이 열려 있는 동안 Tab 포커스는 패널 안에서 순환합니다. (dialog 패턴)
 *
 * 패널 위치(뷰포트 경계에서의 flip/shift)는 useAnchoredFloating(Floating UI)이 계산한다.
 * 컴포넌트는 setTriggerRef를 트리거에, setPanelRef + panelStyle을 패널에 연결하면 된다.
 */
export function usePickerDropdown(): PickerDropdown {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  // Floating UI: 트리거 기준으로 패널을 배치하고, 넘치면 자동으로 flip/shift 한다.
  const floating = useAnchoredFloating({ open: isOpen, placement: 'bottom-start' })
  // Floating UI의 콜백 ref와 우리 object ref(포커스·바깥클릭 판정용)를 함께 연결
  const setTriggerRef = useMergedRef<HTMLButtonElement>(triggerRef, floating.setReference)
  const setPanelRef = useMergedRef<HTMLDivElement>(panelRef, floating.setFloating)

  const close = (focusTrigger = false) => {
    setIsOpen(false)
    if (focusTrigger) triggerRef.current?.focus()
  }

  const toggle = () => setIsOpen(prev => !prev)

  // 패널 안에서 Tab / Shift+Tab 시 처음 ↔ 끝 사이를 순환
  const handlePanelKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== 'Tab') return

    const panel = panelRef.current
    if (!panel) return

    const tabbables = Array.from(panel.querySelectorAll<HTMLElement>(TABBABLE_SELECTOR))
    if (tabbables.length === 0) return

    const first = tabbables[0]
    const last = tabbables[tabbables.length - 1]

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault()
      last.focus()
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault()
      first.focus()
    }
  }

  useEffect(() => {
    if (!isOpen) return

    // 바깥 클릭 시 닫기
    const handleMouseDown = (event: MouseEvent) => {
      const el = containerRef.current
      if (el && !el.contains(event.target as Node)) setIsOpen(false)
    }

    // Escape 로 닫으면 트리거로 포커스 복귀
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
        triggerRef.current?.focus()
      }
    }

    document.addEventListener('mousedown', handleMouseDown)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('mousedown', handleMouseDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen])

  return {
    isOpen,
    containerRef,
    setTriggerRef,
    setPanelRef,
    panelStyle: floating.floatingStyles,
    toggle,
    close,
    handlePanelKeyDown,
  }
}
