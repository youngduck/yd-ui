import { clsx } from 'clsx'

export interface TdProps extends React.ComponentPropsWithoutRef<'td'> {
  children: React.ReactNode
}

export function Td({ children, className, ...props }: TdProps) {
  return (
    <td {...props} className={clsx('yds-table-cell', className)}>
      {children}
    </td>
  )
}
