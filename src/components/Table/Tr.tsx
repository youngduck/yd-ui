import { clsx } from 'clsx'

export interface TrProps extends React.ComponentPropsWithoutRef<'tr'> {
  children: React.ReactNode
  isStriped?: boolean
}

export function Tr({ children, isStriped, className, ...props }: TrProps) {
  return (
    <tr {...props} className={clsx('yds-table-row', className)}>
      {children}
    </tr>
  )
}
