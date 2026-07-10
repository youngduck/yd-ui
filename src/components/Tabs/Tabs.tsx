import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

const tabsVariants = cva('yds-tabs', {
  variants: {
    size: {
      sm: 'yds-tabs-sm',
      md: 'yds-tabs-md',
      lg: 'yds-tabs-lg',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

// 타입 export
export type TabsSize = VariantProps<typeof tabsVariants>['size']

export type TabOption = {
  /** 화면에 노출되는 라벨 */
  label: string
  /** 선택 값으로 사용되는 고유 값 */
  value: string
  /** 개별 탭 비활성화 여부 */
  disabled?: boolean
}

type TabsProps = {
  /** 탭 항목 목록 */
  options: TabOption[]
  /** 현재 선택된 값 (제어 컴포넌트) */
  value: string
  /** 값이 변경될 때 호출 */
  onValueChange: (value: string) => void
} & Omit<React.ComponentPropsWithoutRef<'div'>, 'onChange'> &
  VariantProps<typeof tabsVariants>

export function Tabs({ options, value, onValueChange, size, className = '', ...props }: TabsProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([])

  // 선택된 탭 위로 부드럽게 이동하는 하이라이트(indicator) 위치/크기
  const [indicatorStyle, setIndicatorStyle] = useState<React.CSSProperties>({ opacity: 0 })
  // 첫 렌더에서는 슬라이드 애니메이션 없이 제자리에 표시, 이후 상호작용부터 애니메이션 적용
  const [animated, setAnimated] = useState(false)

  // 활성화된 탭의 인덱스만 추출 (키보드 이동 시 disabled 건너뛰기 위함)
  const enabledIndexes = options.map((option, index) => (option.disabled ? -1 : index)).filter(index => index !== -1)

  const selectIndex = (index: number) => {
    const option = options[index]
    if (!option || option.disabled) return

    onValueChange(option.value)
    itemRefs.current[index]?.focus()
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    // 현재 탭이 enabledIndexes에서 몇 번째인지 계산
    const position = enabledIndexes.indexOf(index)
    if (position === -1) return

    switch (e.key) {
      case 'ArrowRight':
      case 'ArrowDown': {
        e.preventDefault()
        const next = enabledIndexes[(position + 1) % enabledIndexes.length]
        selectIndex(next)
        break
      }
      case 'ArrowLeft':
      case 'ArrowUp': {
        e.preventDefault()
        const prev = enabledIndexes[(position - 1 + enabledIndexes.length) % enabledIndexes.length]
        selectIndex(prev)
        break
      }
      case 'Home': {
        e.preventDefault()
        selectIndex(enabledIndexes[0])
        break
      }
      case 'End': {
        e.preventDefault()
        selectIndex(enabledIndexes[enabledIndexes.length - 1])
        break
      }
      default:
        break
    }
  }

  // 로빙 탭인덱스: 선택된 탭만 탭 가능. 선택값이 없으면 첫 활성 탭을 탭 가능하게.
  const selectedIndex = options.findIndex(option => option.value === value)
  const focusableIndex = selectedIndex !== -1 ? selectedIndex : enabledIndexes[0]

  // 선택된 탭의 위치/크기를 측정해 indicator에 반영. 선택값이 없으면 숨김.
  useLayoutEffect(() => {
    const el = selectedIndex !== -1 ? itemRefs.current[selectedIndex] : null

    if (!el) {
      setIndicatorStyle(prev => ({ ...prev, opacity: 0 }))
      return
    }

    const update = () => {
      setIndicatorStyle({
        opacity: 1,
        width: el.offsetWidth,
        height: el.offsetHeight,
        transform: `translate(${el.offsetLeft}px, ${el.offsetTop}px)`,
      })
    }

    update()

    // 컨테이너/폰트 로드 등으로 크기가 바뀌면 위치 재계산
    const observer = new ResizeObserver(update)
    if (containerRef.current) observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [selectedIndex, size, options])

  // 마운트 직후부터 슬라이드 애니메이션 활성화 (첫 배치는 애니메이션 없이)
  useEffect(() => {
    const id = requestAnimationFrame(() => setAnimated(true))
    return () => cancelAnimationFrame(id)
  }, [])

  return (
    <div
      ref={containerRef}
      role="radiogroup"
      aria-label={props['aria-label'] || '탭'}
      className={`${tabsVariants({ size })} ${className}`}
      {...props}
    >
      <span
        aria-hidden="true"
        className={`yds-tabs-indicator${animated ? ' yds-tabs-indicator-animated' : ''}`}
        style={indicatorStyle}
      />
      {options.map((option, index) => {
        const selected = option.value === value

        return (
          <button
            key={option.value}
            ref={el => {
              itemRefs.current[index] = el
            }}
            type="button"
            role="radio"
            aria-checked={selected}
            aria-label={option.label}
            disabled={option.disabled}
            tabIndex={index === focusableIndex ? 0 : -1}
            className={`yds-tabs-item${selected ? ' yds-tabs-item-selected' : ''}`}
            onClick={() => {
              if (!option.disabled) onValueChange(option.value)
            }}
            onKeyDown={e => handleKeyDown(e, index)}
          >
            {option.label}
          </button>
        )
      })}
    </div>
  )
}

Tabs.displayName = 'Tabs'
