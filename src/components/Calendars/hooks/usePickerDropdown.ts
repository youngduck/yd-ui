import { useEffect, useRef, useState } from 'react'

// 로빙 탭인덱스(-1) 셀은 제외하고 실제 Tab 으로 이동 가능한 요소만 선택
const TABBABLE_SELECTOR = 'button:not([disabled]):not([tabindex="-1"])'

/**
 * 달력 피커 공통 드롭다운 훅.
 * 패널 열림/닫힘 상태와 바깥 클릭·Escape 닫기를 담당하고,
 * 키보드로 닫을 때는 트리거로 포커스를 복귀시킵니다.
 * 패널이 열려 있는 동안 Tab 포커스는 패널 안에서 순환합니다. (dialog 패턴)
 */
export function usePickerDropdown() {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

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

  return { isOpen, containerRef, triggerRef, panelRef, toggle, close, handlePanelKeyDown }
}
