import { clsx } from 'clsx'
import { useContext } from 'react'
import { TableContext } from './Table'

export interface THeadProps extends React.ComponentPropsWithoutRef<'thead'> {
  children: React.ReactNode
}

export function THead({ children, className, ...props }: THeadProps) {
  const context = useContext(TableContext)
  const scrollable = context?.scrollable || false
  const baseClassName = (() => {
    if (scrollable) {
      return 'sticky top-0 yds-table-header'
    }
    return 'yds-table-header'
  })()
  return (
    <thead {...props} className={clsx(baseClassName, className)}>
      {children}
    </thead>
  )
}
