import { useEffect, useRef, useState } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { CalendarDays, ChevronLeft, ChevronRight } from 'lucide-react'
import { usePickerDropdown } from '../hooks/usePickerDropdown'
import {
  CALENDAR_WEEKDAY_LABELS,
  clampYear,
  formatDateValue,
  getDaysInMonth,
  getFirstWeekday,
  getToday,
  moveGridFocus,
  parseDateValue,
} from '../utils/calendarDate'

const datePickerVariants = cva('yds-calendar', {
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
export type DatePickerSize = VariantProps<typeof datePickerVariants>['size']

const GRID_COLS = 7
// 항상 6주(42칸) 고정 그리드로 렌더링해 월 이동 시 패널 높이가 변하지 않도록 함
const CELL_COUNT = 42

type DateCell = {
  year: number
  month: number
  day: number
  /** 표시 중인 달의 앞뒤를 채우는 다른 달 날짜 여부 */
  outside: boolean
}

type DatePickerProps = {
  /** 현재 선택된 값 (YYYY-MM-DD 형식, 미선택 시 빈 문자열) */
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
  VariantProps<typeof datePickerVariants>

// 표시 중인 달의 6주 그리드 셀 목록 (앞뒤는 이전/다음 달 날짜로 채움)
const buildDateCells = (year: number, month: number): DateCell[] => {
  const firstWeekday = getFirstWeekday(year, month)
  const daysInMonth = getDaysInMonth(year, month)
  const prevYear = month === 1 ? year - 1 : year
  const prevMonth = month === 1 ? 12 : month - 1
  const nextYear = month === 12 ? year + 1 : year
  const nextMonth = month === 12 ? 1 : month + 1
  const daysInPrevMonth = getDaysInMonth(prevYear, prevMonth)

  const cells: DateCell[] = []
  for (let i = 0; i < firstWeekday; i++) {
    cells.push({ year: prevYear, month: prevMonth, day: daysInPrevMonth - firstWeekday + 1 + i, outside: true })
  }
  for (let day = 1; day <= daysInMonth; day++) {
    cells.push({ year, month, day, outside: false })
  }
  for (let day = 1; cells.length < CELL_COUNT; day++) {
    cells.push({ year: nextYear, month: nextMonth, day, outside: true })
  }
  return cells
}

export function DatePicker({
  value,
  onValueChange,
  minYear = 1900,
  maxYear = 2100,
  placeholder = '날짜 선택',
  disabled,
  size,
  className = '',
  ...props
}: DatePickerProps) {
  const { isOpen, containerRef, triggerRef, panelRef, toggle, close, handlePanelKeyDown } = usePickerDropdown()
  const cellRefs = useRef<(HTMLButtonElement | null)[]>([])

  const today = getToday()
  const selected = parseDateValue(value)

  // 패널에 표시 중인 연/월
  const [viewYear, setViewYear] = useState(selected?.year ?? today.year)
  const [viewMonth, setViewMonth] = useState(selected?.month ?? today.month)
  // 로빙 탭인덱스: 그리드에서 포커스를 받을 셀 인덱스
  const [focusIndex, setFocusIndex] = useState(0)

  const cells = buildDateCells(viewYear, viewMonth)

  // 패널이 열리면 선택값(없으면 오늘) 기준으로 뷰를 맞추고 해당 셀에 포커스
  useEffect(() => {
    if (!isOpen) return

    const base = selected ?? today
    const year = clampYear(base.year, minYear, maxYear)
    const month = year === base.year ? base.month : 1
    const day = year === base.year && month === base.month ? base.day : 1
    const index = getFirstWeekday(year, month) + day - 1

    setViewYear(year)
    setViewMonth(month)
    setFocusIndex(index)

    // 상태 반영 후 렌더가 끝난 다음 포커스 이동
    const id = requestAnimationFrame(() => cellRefs.current[index]?.focus())
    return () => cancelAnimationFrame(id)
  }, [isOpen])

  const canGoPrev = viewYear > minYear || (viewYear === minYear && viewMonth > 1)
  const canGoNext = viewYear < maxYear || (viewYear === maxYear && viewMonth < 12)

  const goPrevMonth = () => {
    if (viewMonth === 1) {
      setViewYear(viewYear - 1)
      setViewMonth(12)
    } else {
      setViewMonth(viewMonth - 1)
    }
  }

  const goNextMonth = () => {
    if (viewMonth === 12) {
      setViewYear(viewYear + 1)
      setViewMonth(1)
    } else {
      setViewMonth(viewMonth + 1)
    }
  }

  const selectCell = (cell: DateCell) => {
    onValueChange(formatDateValue(cell.year, cell.month, cell.day))
    close(true)
  }

  const handleCellKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    const next = moveGridFocus(index, CELL_COUNT, GRID_COLS, e.key)
    if (next === null) return

    e.preventDefault()

    // 범위 밖 날짜 셀은 disabled 라 포커스를 받을 수 없으므로 이동하지 않음 (포커스 유실 방지)
    const targetCell = cells[next]
    if (targetCell.year < minYear || targetCell.year > maxYear) return

    setFocusIndex(next)
    cellRefs.current[next]?.focus()
  }

  return (
    <div ref={containerRef} className={`${datePickerVariants({ size })} ${className}`} {...props}>
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        disabled={disabled}
        className={`yds-calendar-trigger${selected ? '' : ' yds-calendar-trigger-empty'}`}
        onClick={toggle}
      >
        {selected ? `${selected.year}년 ${selected.month}월 ${selected.day}일` : placeholder}
        <CalendarDays size={20} aria-hidden />
      </button>
      {isOpen && (
        <div
          ref={panelRef}
          role="dialog"
          aria-label="날짜 선택 달력"
          className="yds-calendar-panel"
          onKeyDown={handlePanelKeyDown}
        >
          <div className="yds-calendar-header">
            <button
              type="button"
              className="yds-calendar-nav-button"
              aria-label="이전 달"
              disabled={!canGoPrev}
              onClick={goPrevMonth}
            >
              <ChevronLeft size={20} aria-hidden />
            </button>
            <span className="yds-calendar-header-label" aria-live="polite">
              {viewYear}년 {viewMonth}월
            </span>
            <button
              type="button"
              className="yds-calendar-nav-button"
              aria-label="다음 달"
              disabled={!canGoNext}
              onClick={goNextMonth}
            >
              <ChevronRight size={20} aria-hidden />
            </button>
          </div>
          <div className="yds-calendar-weekdays" aria-hidden="true">
            {CALENDAR_WEEKDAY_LABELS.map(label => (
              <span key={label} className="yds-calendar-weekday">
                {label}
              </span>
            ))}
          </div>
          <div className="yds-calendar-grid yds-calendar-grid-cols-7">
            {cells.map((cell, index) => {
              const isSelected =
                selected !== null &&
                selected.year === cell.year &&
                selected.month === cell.month &&
                selected.day === cell.day
              const isToday = today.year === cell.year && today.month === cell.month && today.day === cell.day

              return (
                <button
                  key={`${cell.year}-${cell.month}-${cell.day}`}
                  ref={el => {
                    cellRefs.current[index] = el
                  }}
                  type="button"
                  tabIndex={index === focusIndex ? 0 : -1}
                  aria-pressed={isSelected}
                  aria-label={`${cell.year}년 ${cell.month}월 ${cell.day}일`}
                  aria-current={isToday ? 'date' : undefined}
                  disabled={cell.year < minYear || cell.year > maxYear}
                  className={`yds-calendar-cell${cell.outside ? ' yds-calendar-cell-outside' : ''}${isToday ? ' yds-calendar-cell-today' : ''}${isSelected ? ' yds-calendar-cell-selected' : ''}`}
                  onClick={() => selectCell(cell)}
                  onKeyDown={e => handleCellKeyDown(e, index)}
                >
                  {cell.day}
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

DatePicker.displayName = 'DatePicker'
