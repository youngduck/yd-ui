import { useEffect, useRef, useState } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { CalendarDays, ChevronLeft, ChevronRight } from 'lucide-react'
import { usePickerDropdown } from '../hooks/usePickerDropdown'
import { clampYear, formatYearMonthValue, getToday, moveGridFocus, parseYearMonthValue } from '../utils/calendarDate'

const monthPickerVariants = cva('yds-calendar', {
  variants: {
    size: {
      sm: 'yds-calendar-sm',
      md: 'yds-calendar-md',
      lg: 'yds-calendar-lg',
      full: 'yds-calendar-full',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

// 타입 export
export type MonthPickerSize = VariantProps<typeof monthPickerVariants>['size']

const MONTH_COUNT = 12
const GRID_COLS = 3

type MonthPickerProps = {
  /** 현재 선택된 값 (YYYY-MM 형식, 미선택 시 빈 문자열) */
  value: string
  /** 값이 변경될 때 호출 */
  onValueChange: (value: string) => void
  /** 선택 가능한 최소 연도 */
  minYear?: number
  /** 선택 가능한 최대 연도 */
  maxYear?: number
  /** 미선택 시 트리거에 표시할 문구 */
  placeholder?: string
  /** 피커 전체 비활성화 여부 */
  disabled?: boolean
} & Omit<React.ComponentPropsWithoutRef<'div'>, 'onChange'> &
  VariantProps<typeof monthPickerVariants>

export function MonthPicker({
  value,
  onValueChange,
  minYear = 1900,
  maxYear = 2100,
  placeholder = '월 선택',
  disabled,
  size,
  className = '',
  ...props
}: MonthPickerProps) {
  const { isOpen, containerRef, triggerRef, panelRef, toggle, close, handlePanelKeyDown } = usePickerDropdown()
  const cellRefs = useRef<(HTMLButtonElement | null)[]>([])

  const today = getToday()
  const selected = parseYearMonthValue(value)

  // 패널에 표시 중인 연도
  const [viewYear, setViewYear] = useState(selected?.year ?? today.year)
  // 로빙 탭인덱스: 그리드에서 포커스를 받을 셀 인덱스
  const [focusIndex, setFocusIndex] = useState(0)

  const months = Array.from({ length: MONTH_COUNT }, (_, index) => index + 1)

  // 패널이 열리면 선택값(없으면 이번 달) 기준으로 연도를 맞추고 해당 셀에 포커스
  useEffect(() => {
    if (!isOpen) return

    const base = selected ?? today
    const year = clampYear(base.year, minYear, maxYear)
    const month = year === base.year ? base.month : 1
    const index = month - 1

    setViewYear(year)
    setFocusIndex(index)

    // 상태 반영 후 렌더가 끝난 다음 포커스 이동
    const id = requestAnimationFrame(() => cellRefs.current[index]?.focus())
    return () => cancelAnimationFrame(id)
  }, [isOpen])

  const canGoPrev = viewYear - 1 >= minYear
  const canGoNext = viewYear + 1 <= maxYear

  const selectMonth = (month: number) => {
    onValueChange(formatYearMonthValue(viewYear, month))
    close(true)
  }

  const handleCellKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    const next = moveGridFocus(index, MONTH_COUNT, GRID_COLS, e.key)
    if (next === null) return

    e.preventDefault()
    setFocusIndex(next)
    cellRefs.current[next]?.focus()
  }

  return (
    <div ref={containerRef} className={`${monthPickerVariants({ size })} ${className}`} {...props}>
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        disabled={disabled}
        className={`yds-calendar-trigger${selected ? '' : ' yds-calendar-trigger-empty'}`}
        onClick={toggle}
      >
        {selected ? `${selected.year}년 ${selected.month}월` : placeholder}
        <CalendarDays size={20} aria-hidden />
      </button>
      {isOpen && (
        <div
          ref={panelRef}
          role="dialog"
          aria-label="월 선택 달력"
          className="yds-calendar-panel"
          onKeyDown={handlePanelKeyDown}
        >
          <div className="yds-calendar-header">
            <button
              type="button"
              className="yds-calendar-nav-button"
              aria-label="이전 연도"
              disabled={!canGoPrev}
              onClick={() => setViewYear(viewYear - 1)}
            >
              <ChevronLeft size={20} aria-hidden />
            </button>
            <span className="yds-calendar-header-label" aria-live="polite">
              {viewYear}년
            </span>
            <button
              type="button"
              className="yds-calendar-nav-button"
              aria-label="다음 연도"
              disabled={!canGoNext}
              onClick={() => setViewYear(viewYear + 1)}
            >
              <ChevronRight size={20} aria-hidden />
            </button>
          </div>
          <div className="yds-calendar-grid yds-calendar-grid-cols-3">
            {months.map((month, index) => {
              const isSelected = selected !== null && selected.year === viewYear && selected.month === month
              const isToday = viewYear === today.year && month === today.month

              return (
                <button
                  key={month}
                  ref={el => {
                    cellRefs.current[index] = el
                  }}
                  type="button"
                  tabIndex={index === focusIndex ? 0 : -1}
                  aria-pressed={isSelected}
                  aria-label={`${viewYear}년 ${month}월`}
                  aria-current={isToday ? 'date' : undefined}
                  className={`yds-calendar-cell${isToday ? ' yds-calendar-cell-today' : ''}${isSelected ? ' yds-calendar-cell-selected' : ''}`}
                  onClick={() => selectMonth(month)}
                  onKeyDown={e => handleCellKeyDown(e, index)}
                >
                  {month}월
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

MonthPicker.displayName = 'MonthPicker'
