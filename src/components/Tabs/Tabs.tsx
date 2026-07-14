import { cva, type VariantProps } from 'class-variance-authority'
import { useRef } from 'react'

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
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([])

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

  return (
    <div
      role="radiogroup"
      aria-label={props['aria-label'] || '탭'}
      className={`${tabsVariants({ size })} ${className}`}
      {...props}
    >
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
