import { clsx } from 'clsx'
import { SortIcon } from './SortIcon'
import type { SortDirection } from './types/sort.types'

export interface ThProps extends React.ComponentPropsWithoutRef<'th'> {
  children: React.ReactNode
  /** 정렬 가능한 헤더 셀로 표시합니다. (클릭·키보드로 정렬 토글) */
  sortable?: boolean
  /** 현재 이 컬럼의 정렬 방향. null·undefined 면 정렬되지 않은 상태입니다. */
  sortDirection?: SortDirection | null
  /** 정렬 토글이 요청될 때 호출됩니다. 인자로 다음 정렬 방향이 전달됩니다. */
  onSortToggle?: (nextDirection: SortDirection) => void
}

/** 현재 방향 기준으로 다음 정렬 방향을 계산합니다. (미정렬·내림차순 → 오름차순, 오름차순 → 내림차순) */
const getNextDirection = (current: SortDirection | null | undefined): SortDirection =>
  current === 'asc' ? 'desc' : 'asc'

export function Th({ children, className, sortable = false, sortDirection = null, onSortToggle, ...props }: ThProps) {
  if (!sortable) {
    return (
      <th {...props} className={clsx('yds-table-header-cell', className)}>
        {children}
      </th>
    )
  }

  const ariaSort = sortDirection === 'asc' ? 'ascending' : sortDirection === 'desc' ? 'descending' : 'none'

  return (
    <th
      {...props}
      aria-sort={ariaSort}
      className={clsx('yds-table-header-cell', 'yds-table-header-cell-sortable', className)}
    >
      <button
        type="button"
        className="yds-table-sort-button"
        aria-label={typeof children === 'string' ? `${children} 정렬` : undefined}
        onClick={() => onSortToggle?.(getNextDirection(sortDirection))}
      >
        <span className="yds-table-sort-label">{children}</span>
        <SortIcon direction={sortDirection} />
      </button>
    </th>
  )
}
