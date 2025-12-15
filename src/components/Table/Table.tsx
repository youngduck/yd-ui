import { clsx } from 'clsx'
import { createContext } from 'react'

interface TableContextType {
  variant: 'default' | 'striped' | 'bordered'
}
export interface TableProps extends React.ComponentPropsWithoutRef<'table'> {
  children: React.ReactNode
  variant?: 'default' | 'striped' | 'bordered'
}

export const TableContext = createContext<TableContextType | null>(null)

export function Table({ children, variant = 'default', className, ...props }: TableProps) {
  return (
    <TableContext.Provider value={{ variant }}>
      <table {...props} className={clsx('yds-table-wrapper', className)}>
        {children}
      </table>
    </TableContext.Provider>
  )
}
