/**
 * 작성자: KYD
 * 기능: 헤더를 눌러 본문을 펼치고 접는 목록
 * 프로세스 설명: Card 와 동일하게 outlined(테두리) / filled(배경) 두 가지 variant 를 지원
 */
import { clsx } from 'clsx'
import { cva, type VariantProps } from 'class-variance-authority'
import { useId, useRef, useState, type ReactNode } from 'react'
import { ChevronDown } from 'lucide-react'

const accordionVariants = cva('yds-accordion', {
  variants: {
    variant: {
      /** 테두리로 영역을 구분 (기본) */
      outlined: 'yds-accordion-outlined',
      /** 배경색으로 영역을 구분 */
      filled: 'yds-accordion-filled',
    },
  },
  defaultVariants: {
    variant: 'outlined',
  },
})

// 타입 export
export type AccordionVariant = VariantProps<typeof accordionVariants>['variant']

export type AccordionItem = {
  /** 헤더에 노출되는 라벨. 문자열뿐 아니라 임의의 JSX 도 넣을 수 있다 */
  label: ReactNode
  /** 열림 상태를 식별하는 고유 값 */
  value: string
  /** 펼쳐졌을 때 보여줄 본문 */
  content: ReactNode
  /** 개별 항목 비활성화 여부 */
  disabled?: boolean
}

/** 헤더 제목 레벨. 주변 문서 구조에 맞춰야 스크린리더 탐색이 자연스럽다 */
export type AccordionHeadingLevel = 2 | 3 | 4 | 5 | 6

type AccordionProps = {
  /** 아코디언 항목 목록 */
  items: AccordionItem[]
  /** 제어 모드: 현재 펼쳐진 값 목록. 주지 않으면 비제어로 동작한다 */
  value?: string[]
  /** 비제어 모드: 처음부터 펼쳐둘 값 목록 (기본값 없음 = 전부 접힌 상태) */
  defaultValue?: string[]
  /** 펼쳐진 값이 변경될 때 호출. 비제어 모드에서도 알림 용도로 받을 수 있다 */
  onValueChange?: (value: string[]) => void
  /**
   * single: 하나를 펼치면 나머지가 닫힌다. (기본값)
   * multiple: 여러 항목을 동시에 펼칠 수 있다.
   */
  type?: 'single' | 'multiple'
  /** 헤더에 사용할 제목 레벨 (기본값 3) */
  headingLevel?: AccordionHeadingLevel
  /**
   * 한 번도 펼쳐진 적 없는 본문을 렌더하지 않는다. 본문이 스스로 쿼리를 던질 때 쓴다.
   * 펼친 뒤에는 접어도 남는다 (언마운트하지 않는다).
   */
  lazy?: boolean
} & Omit<React.ComponentPropsWithoutRef<'div'>, 'onChange'> &
  VariantProps<typeof accordionVariants>

export function Accordion({
  items,
  value,
  defaultValue,
  onValueChange,
  type = 'single',
  headingLevel = 3,
  lazy = false,
  variant,
  className = '',
  ...props
}: AccordionProps) {
  const triggerRefs = useRef<(HTMLButtonElement | null)[]>([])
  const baseId = useId()

  // 펼침 상태는 대부분 바깥에서 쓸 일이 없는 UI 상태라 비제어가 기본이다 (PagedCard 와 같은 방식)
  const isControlled = value !== undefined
  const [internalValue, setInternalValue] = useState<string[]>(() => defaultValue ?? [])
  const openValues = isControlled ? value : internalValue

  const commit = (next: string[]) => {
    if (!isControlled) setInternalValue(next)
    onValueChange?.(next)
  }

  // 접을 때 지우지 않는다. 본문이 쿼리를 들고 있을 때 접었다 펼 때마다 재요청되는 것을 막기 위함이다
  const everExpandedRef = useRef<Set<string>>(new Set(openValues))
  openValues.forEach(openValue => everExpandedRef.current.add(openValue))

  // 활성화된 항목의 인덱스만 추출 (키보드 이동 시 disabled 건너뛰기 위함)
  const enabledIndexes = items.map((item, index) => (item.disabled ? -1 : index)).filter(index => index !== -1)

  const toggle = (item: AccordionItem) => {
    if (item.disabled) return

    const expanded = openValues.includes(item.value)
    if (expanded) {
      commit(openValues.filter(openValue => openValue !== item.value))
      return
    }
    commit(type === 'single' ? [item.value] : [...openValues, item.value])
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    const position = enabledIndexes.indexOf(index)
    if (position === -1) return

    switch (e.key) {
      case 'ArrowDown': {
        e.preventDefault()
        const next = enabledIndexes[(position + 1) % enabledIndexes.length]
        triggerRefs.current[next]?.focus()
        break
      }
      case 'ArrowUp': {
        e.preventDefault()
        const prev = enabledIndexes[(position - 1 + enabledIndexes.length) % enabledIndexes.length]
        triggerRefs.current[prev]?.focus()
        break
      }
      case 'Home': {
        e.preventDefault()
        triggerRefs.current[enabledIndexes[0]]?.focus()
        break
      }
      case 'End': {
        e.preventDefault()
        triggerRefs.current[enabledIndexes[enabledIndexes.length - 1]]?.focus()
        break
      }
      default:
        break
    }
  }

  // 아코디언 헤더는 제목 요소 안의 버튼이어야 한다 (WAI-ARIA Accordion 패턴)
  const Heading = `h${headingLevel}` as const

  return (
    <div className={clsx(accordionVariants({ variant }), className)} {...props}>
      {items.map((item, index) => {
        const expanded = openValues.includes(item.value)
        const triggerId = `${baseId}-trigger-${index}`
        const panelId = `${baseId}-panel-${index}`

        return (
          <div key={item.value} className="yds-accordion-item">
            <Heading className="yds-accordion-heading">
              <button
                ref={el => {
                  triggerRefs.current[index] = el
                }}
                id={triggerId}
                type="button"
                aria-expanded={expanded}
                aria-controls={panelId}
                disabled={item.disabled}
                className={clsx('yds-accordion-trigger', expanded && 'yds-accordion-trigger-expanded')}
                onClick={() => toggle(item)}
                onKeyDown={e => handleKeyDown(e, index)}
              >
                <span className="yds-accordion-label">{item.label}</span>
                <ChevronDown className="yds-accordion-icon" aria-hidden />
              </button>
            </Heading>
            {/* 접혀도 DOM 에 남긴다(높이 전환 애니메이션). 접근성 트리 제외는 CSS 의 visibility 가 담당한다 */}
            <div
              id={panelId}
              role="region"
              aria-labelledby={triggerId}
              className={clsx('yds-accordion-panel', expanded && 'yds-accordion-panel-expanded')}
            >
              <div className="yds-accordion-panel-inner">
                <div className="yds-accordion-panel-content">
                  {lazy && !everExpandedRef.current.has(item.value) ? null : item.content}
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

Accordion.displayName = 'Accordion'
