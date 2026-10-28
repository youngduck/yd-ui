import { clsx } from 'clsx'
import { cva, type VariantProps } from 'class-variance-authority'
import { useRef, useState } from 'react'

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
  /** 제어 모드: 현재 선택된 값. 주지 않으면 비제어로 동작한다 */
  value?: string
  /** 비제어 모드: 처음 선택해둘 값. 주지 않으면 아무 탭도 선택되지 않는다 */
  defaultValue?: string
  /** 값이 변경될 때 호출. 비제어 모드에서도 알림 용도로 받을 수 있다 */
  onValueChange?: (value: string) => void
} & Omit<React.ComponentPropsWithoutRef<'div'>, 'onChange'> &
  VariantProps<typeof tabsVariants>

export function Tabs({ options, value, defaultValue, onValueChange, size, className = '', ...props }: TabsProps) {
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([])

  // 탭 선택은 라우팅·쿼리와 엮일 때만 바깥이 알면 되므로 비제어가 기본이다
  const isControlled = value !== undefined
  const [internalValue, setInternalValue] = useState(() => defaultValue ?? '')
  const selectedValue = isControlled ? value : internalValue

  const commit = (next: string) => {
    if (!isControlled) setInternalValue(next)
    onValueChange?.(next)
  }

  // 활성화된 탭의 인덱스만 추출 (키보드 이동 시 disabled 건너뛰기 위함)
  const enabledIndexes = options.map((option, index) => (option.disabled ? -1 : index)).filter(index => index !== -1)

  const selectIndex = (index: number) => {
    const option = options[index]
    if (!option || option.disabled) return

    commit(option.value)
    itemRefs.current[index]?.focus()
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
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
  const selectedIndex = options.findIndex(option => option.value === selectedValue)
  const focusableIndex = selectedIndex !== -1 ? selectedIndex : enabledIndexes[0]

  return (
    <div
      role="radiogroup"
      aria-label={props['aria-label'] || '탭'}
      className={clsx(tabsVariants({ size }), className)}
      {...props}
    >
      {options.map((option, index) => {
        const selected = option.value === selectedValue

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
            className={clsx('yds-tabs-item', selected && 'yds-tabs-item-selected')}
            onClick={() => {
              if (!option.disabled) commit(option.value)
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
