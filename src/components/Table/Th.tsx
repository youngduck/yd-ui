import { clsx } from 'clsx'

export interface ThProps extends React.ComponentPropsWithoutRef<'th'> {
  children: React.ReactNode
}

export function Th({ children, className, ...props }: ThProps) {
  return (
    <th {...props} className={clsx('yds-table-header-cell', className)}>
      {children}
    </th>
  )
}
