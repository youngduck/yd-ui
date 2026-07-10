import { useEffect, useRef, useState } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { CalendarDays, ChevronLeft, ChevronRight } from 'lucide-react'
import { usePickerDropdown } from '../hooks/usePickerDropdown'
import { clampYear, formatYearValue, getToday, moveGridFocus, parseYearValue } from '../utils/calendarDate'

const yearPickerVariants = cva('yds-calendar', {
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
export type YearPickerSize = VariantProps<typeof yearPickerVariants>['size']

const YEARS_PER_PAGE = 12
const GRID_COLS = 3

type YearPickerProps = {
  /** 현재 선택된 값 (YYYY 형식, 미선택 시 빈 문자열) */
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
  VariantProps<typeof yearPickerVariants>

// 연도가 속한 12년 페이지의 시작 연도
const getPageStart = (year: number) => Math.floor(year / YEARS_PER_PAGE) * YEARS_PER_PAGE

export function YearPicker({
  value,
  onValueChange,
  minYear = 1900,
  maxYear = 2100,
  placeholder = '연도 선택',
  disabled,
  size,
  className = '',
  ...props
}: YearPickerProps) {
  const { isOpen, containerRef, triggerRef, panelRef, toggle, close, handlePanelKeyDown } = usePickerDropdown()
  const cellRefs = useRef<(HTMLButtonElement | null)[]>([])

  const today = getToday()
  const selectedYear = parseYearValue(value)

  // 패널에 표시 중인 12년 페이지의 시작 연도
  const [pageStart, setPageStart] = useState(() => getPageStart(selectedYear ?? today.year))
  // 로빙 탭인덱스: 그리드에서 포커스를 받을 셀 인덱스
  const [focusIndex, setFocusIndex] = useState(0)

  const years = Array.from({ length: YEARS_PER_PAGE }, (_, index) => pageStart + index)

  // 패널이 열리면 선택값(없으면 올해) 기준으로 페이지를 맞추고 해당 셀에 포커스
  useEffect(() => {
    if (!isOpen) return

    const baseYear = clampYear(selectedYear ?? today.year, minYear, maxYear)
    const nextStart = getPageStart(baseYear)
    const index = baseYear - nextStart

    setPageStart(nextStart)
    setFocusIndex(index)

    // 상태 반영 후 렌더가 끝난 다음 포커스 이동
    const id = requestAnimationFrame(() => cellRefs.current[index]?.focus())
    return () => cancelAnimationFrame(id)
  }, [isOpen])

  const canGoPrev = pageStart - 1 >= minYear
  const canGoNext = pageStart + YEARS_PER_PAGE <= maxYear

  const selectYear = (year: number) => {
    onValueChange(formatYearValue(year))
    close(true)
  }

  const handleCellKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    const next = moveGridFocus(index, YEARS_PER_PAGE, GRID_COLS, e.key)
    if (next === null) return

    e.preventDefault()
    setFocusIndex(next)
    cellRefs.current[next]?.focus()
  }

  return (
    <div ref={containerRef} className={`${yearPickerVariants({ size })} ${className}`} {...props}>
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        disabled={disabled}
        className={`yds-calendar-trigger${selectedYear === null ? ' yds-calendar-trigger-empty' : ''}`}
        onClick={toggle}
      >
        {selectedYear !== null ? `${selectedYear}년` : placeholder}
        <CalendarDays size={20} aria-hidden />
      </button>
      {isOpen && (
        <div
          ref={panelRef}
          role="dialog"
          aria-label="연도 선택 달력"
          className="yds-calendar-panel"
          onKeyDown={handlePanelKeyDown}
        >
          <div className="yds-calendar-header">
            <button
              type="button"
              className="yds-calendar-nav-button"
              aria-label="이전 연도 목록"
              disabled={!canGoPrev}
              onClick={() => setPageStart(pageStart - YEARS_PER_PAGE)}
            >
              <ChevronLeft size={20} aria-hidden />
            </button>
            <span className="yds-calendar-header-label" aria-live="polite">
              {pageStart}년 - {pageStart + YEARS_PER_PAGE - 1}년
            </span>
            <button
              type="button"
              className="yds-calendar-nav-button"
              aria-label="다음 연도 목록"
              disabled={!canGoNext}
              onClick={() => setPageStart(pageStart + YEARS_PER_PAGE)}
            >
              <ChevronRight size={20} aria-hidden />
            </button>
          </div>
          <div className="yds-calendar-grid yds-calendar-grid-cols-3">
            {years.map((year, index) => {
              const selected = year === selectedYear
              const isToday = year === today.year

              return (
                <button
                  key={year}
                  ref={el => {
                    cellRefs.current[index] = el
                  }}
                  type="button"
                  tabIndex={index === focusIndex ? 0 : -1}
                  aria-pressed={selected}
                  aria-label={`${year}년`}
                  aria-current={isToday ? 'date' : undefined}
                  disabled={year < minYear || year > maxYear}
                  className={`yds-calendar-cell${isToday ? ' yds-calendar-cell-today' : ''}${selected ? ' yds-calendar-cell-selected' : ''}`}
                  onClick={() => selectYear(year)}
                  onKeyDown={e => handleCellKeyDown(e, index)}
                >
                  {year}
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

YearPicker.displayName = 'YearPicker'
