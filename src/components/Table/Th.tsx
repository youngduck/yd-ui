import { clsx } from 'clsx'
import { MoveDown, MoveUp } from 'lucide-react'
import { useContext } from 'react'
import { TableContext } from './Table'
import type { SortDirection } from './types'

export interface ThProps extends React.ComponentPropsWithoutRef<'th'> {
  children: React.ReactNode
  /** 이 컬럼에 정렬 기능을 켤지 여부 */
  sortable?: boolean
  /** THead가 자동 주입하는 열 인덱스 (내부용, 직접 지정하지 않음) */
  _colIndex?: number
}

function SortIcon({ direction }: { direction: SortDirection }) {
  return (
    <span className="yds-table-sort-icon" aria-hidden="true">
      {/* 위로 향하는 꼬리 화살표 (오름차순) */}
      <MoveUp
        size={14}
        className={clsx('yds-table-sort-arrow', direction === 'asc' && 'yds-table-sort-arrow--active')}
      />
      {/* 아래로 향하는 꼬리 화살표 (내림차순) */}
      <MoveDown
        size={14}
        className={clsx('yds-table-sort-arrow', direction === 'desc' && 'yds-table-sort-arrow--active')}
      />
    </span>
  )
}

export function Th({ children, className, sortable, _colIndex, ...props }: ThProps) {
  const context = useContext(TableContext)

  if (!sortable || !context || _colIndex === undefined) {
    return (
      <th {...props} className={clsx('yds-table-header-cell', className)}>
        {children}
      </th>
    )
  }

  const { sort, requestSort } = context
  const active = sort.activeIndex === _colIndex
  const direction = active ? sort.direction : null
  const ariaSort = direction === 'asc' ? 'ascending' : direction === 'desc' ? 'descending' : 'none'

  return (
    <th
      {...props}
      aria-sort={ariaSort}
      className={clsx('yds-table-header-cell yds-table-header-cell--sortable', className)}
    >
      <button type="button" className="yds-table-sort-button" onClick={() => requestSort(_colIndex)}>
        {children}
        <SortIcon direction={direction} />
      </button>
    </th>
  )
}
