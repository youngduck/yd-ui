import { clsx } from 'clsx'
import { createContext } from 'react'

interface TableContextType {
  scrollable: boolean
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
  if (scrollable) {
    return (
      <TableContext.Provider value={{ scrollable }}>
        <div className={clsx('overflow-y-auto', scrollClassName)}>
          <table {...props} className={clsx('yds-table-wrapper', className)}>
            {children}
          </table>
        </div>
      </TableContext.Provider>
    )
  } else {
    return (
      <TableContext.Provider value={{ scrollable: false }}>
        <table {...props} className={clsx('yds-table-wrapper', className)}>
          {children}
        </table>
      </TableContext.Provider>
    )
  }
}
