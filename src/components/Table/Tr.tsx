import { clsx } from 'clsx'
import { useContext } from 'react'
import { TableContext } from './Table'

export interface TrProps extends React.ComponentPropsWithoutRef<'tr'> {
  children: React.ReactNode
  isStriped?: boolean
}

export function Tr({ children, isStriped, className, ...props }: TrProps) {
  const context = useContext(TableContext)
  const variant = context?.variant || 'default'

  const baseClassName = (() => {
    if (variant === 'striped' && isStriped) {
      return 'yds-table-row-striped'
    }
    return 'yds-table-row'
  })()

  return (
    <tr {...props} className={clsx(baseClassName, className)}>
      {children}
    </tr>
  )
}
