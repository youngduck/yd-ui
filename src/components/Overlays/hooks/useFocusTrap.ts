import { useEffect, useRef, useCallback } from 'react'

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'

export function useFocusTrap<T extends HTMLElement = HTMLElement>() {
  const trapRef = useRef<T>(null)
  const previousActiveElementRef = useRef<HTMLElement | null>(null)

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key !== 'Tab') return
    const container = trapRef.current
    if (!container) return

    const focusableElements = Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter(
      el => el.offsetParent !== null,
    )

    if (focusableElements.length === 0) {
      e.preventDefault()
      return
    }

    const first = focusableElements[0]
    const last = focusableElements[focusableElements.length - 1]

    if (e.shiftKey) {
      if (document.activeElement === first || document.activeElement === container) {
        e.preventDefault()
        last.focus()
      }
    } else {
      if (document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
  }, [])

  useEffect(() => {
    previousActiveElementRef.current = document.activeElement as HTMLElement | null

    const container = trapRef.current
    if (!container) return

    const focusableElements = container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
    if (focusableElements.length > 0) {
      focusableElements[0].focus()
    } else {
      container.focus()
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      previousActiveElementRef.current?.focus()
    }
  }, [handleKeyDown])

  return trapRef
}
