import { clsx } from 'clsx'

export interface TrProps extends React.ComponentPropsWithoutRef<'tr'> {
  children: React.ReactNode
}

export function Tr({ children, className, ...props }: TrProps) {
  return (
    <tr {...props} className={clsx('yds-table-row', className)}>
      {children}
    </tr>
  )
}
