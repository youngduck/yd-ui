import { clsx } from 'clsx'
import { createContext, useCallback, useMemo, useState } from 'react'
import { nextSortDirection, type SortDirection } from './types'

interface SortState {
  activeIndex: number | null
  direction: SortDirection
}

interface TableContextType {
  scrollable: boolean
  sort: SortState
  requestSort: (columnIndex: number) => void
}

export const TableContext = createContext<TableContextType | null>(null)

export interface TableBaseProps extends React.ComponentPropsWithoutRef<'table'> {
  children: React.ReactNode
}

interface TableScrollableProps extends TableBaseProps {
  scrollable: true
  scrollClassName: `${'w-' | 'h-'}${string}`
}

interface TableScrollUnAvailableProps extends TableBaseProps {
  scrollable?: false
  scrollClassName?: never
}

export type TableProps = TableScrollableProps | TableScrollUnAvailableProps

export function Table({ children, className, scrollable, scrollClassName, ...props }: TableProps) {
  const [sort, setSort] = useState<SortState>({ activeIndex: null, direction: null })

  // 같은 컬럼 재클릭 시 3단계 순환(asc→desc→해제), 다른 컬럼 클릭 시 asc로 시작
  const requestSort = useCallback((columnIndex: number) => {
    setSort(prev => {
      if (prev.activeIndex !== columnIndex) return { activeIndex: columnIndex, direction: 'asc' }
      const next = nextSortDirection(prev.direction)
      return next === null ? { activeIndex: null, direction: null } : { activeIndex: columnIndex, direction: next }
    })
  }, [])

  const contextValue = useMemo<TableContextType>(
    () => ({ scrollable: scrollable ?? false, sort, requestSort }),
    [scrollable, sort, requestSort],
  )

  if (scrollable) {
    return (
      <TableContext.Provider value={contextValue}>
        <div className={clsx('overflow-y-auto', scrollClassName)}>
          <table {...props} className={clsx('yds-table-wrapper', className)}>
            {children}
          </table>
        </div>
      </TableContext.Provider>
    )
  }

  return (
    <TableContext.Provider value={contextValue}>
      <table {...props} className={clsx('yds-table-wrapper', className)}>
        {children}
      </table>
    </TableContext.Provider>
  )
}
