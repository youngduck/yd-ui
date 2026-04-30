/**
 * mousedown: 마우스 버튼을 누르는 순간
 * mouseup: 마우스 버튼을 떼는 순간
 * mouseenter: 마우스 커서가 요소 위에 올라갔을 때
 * mouseleave: 마우스 커서가 요소에서 벗어났을 때
 */
import { useEffect, useRef } from 'react'

type AsTag = 'div' | 'ul' | 'ol' | 'nav' | 'section'

type HorizonDragScrollProps<T extends AsTag = 'div'> = {
  as?: T
} & React.PropsWithChildren<React.HTMLAttributes<HTMLElement>>

const BASE_CLASS = 'horizon-drag-scroll'
const ACTIVATION_DISTANCE = 5
const KEYBOARD_SCROLL_AMOUNT = 150

export function HorizonDragScroll<T extends AsTag = 'div'>({
  as,
  children,
  className,
  ...props
}: HorizonDragScrollProps<T>) {
  const Tag = (as || 'div') as React.ElementType
  const containerClassName = className ? `${BASE_CLASS} ${className}` : BASE_CLASS

  // SECTION DOM 직접제어 상태값
  const containerRef = useRef<HTMLElement>(null)
  const pressedRef = useRef(false)
  const isDraggingRef = useRef(false)
  const startXRef = useRef(0)
  const startScrollLeftRef = useRef(0)
  // !SECTION DOM 직접제어 상태값

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault()
    pressedRef.current = true
    startXRef.current = e.clientX
    startScrollLeftRef.current = containerRef.current!.scrollLeft
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    const container = containerRef.current
    if (!container) return

    switch (e.key) {
      case 'ArrowLeft':
        e.preventDefault()
        container.scrollBy({ left: -KEYBOARD_SCROLL_AMOUNT, behavior: 'smooth' })
        break
      case 'ArrowRight':
        e.preventDefault()
        container.scrollBy({ left: KEYBOARD_SCROLL_AMOUNT, behavior: 'smooth' })
        break
      case 'Home':
        e.preventDefault()
        container.scrollTo({ left: 0, behavior: 'smooth' })
        break
      case 'End':
        e.preventDefault()
        container.scrollTo({ left: container.scrollWidth, behavior: 'smooth' })
        break
    }
  }

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleMouseMove = (e: MouseEvent) => {
      if (!pressedRef.current) return
      const deltaX = e.clientX - startXRef.current

      if (!isDraggingRef.current) {
        if (Math.abs(deltaX) < ACTIVATION_DISTANCE) return
        isDraggingRef.current = true
      }

      container.scrollLeft = startScrollLeftRef.current - deltaX
    }

    const handleMouseUp = () => {
      pressedRef.current = false
    }

    // 드래그 직후 발생하는 click 이벤트를 캡처 단계에서 차단
    const handleClick = (e: MouseEvent) => {
      if (isDraggingRef.current) {
        e.stopPropagation()
        isDraggingRef.current = false
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)
    container.addEventListener('click', handleClick, true)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
      container.removeEventListener('click', handleClick, true)
    }
  }, [])

  return (
    <Tag
      {...props}
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onKeyDown={handleKeyDown}
      className={containerClassName}
      tabIndex={0}
      role="region"
      aria-label="횡스크롤 영역"
    >
      {children}
    </Tag>
  )
}

HorizonDragScroll.displayName = 'HorizonDragScroll'
