import { RefObject, useEffect } from 'react'

export function useOutsideDismiss(
  containerRef: RefObject<HTMLElement | null>,
  enabled: boolean,
  onDismiss: () => void,
) {
  useEffect(() => {
    if (!enabled) return

    const handle = (event: MouseEvent) => {
      const el = containerRef.current
      if (!el) return
      if (!el.contains(event.target as Node)) {
        onDismiss()
      }
    }

    document.addEventListener('mousedown', handle)
    return () => document.removeEventListener('mousedown', handle)
  }, [enabled, containerRef, onDismiss])
}

export function useEscapeDismiss(enabled: boolean, onDismiss: () => void) {
  useEffect(() => {
    if (!enabled) return

    const handle = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onDismiss()
    }

    document.addEventListener('keydown', handle)
    return () => document.removeEventListener('keydown', handle)
  }, [enabled, onDismiss])
}
