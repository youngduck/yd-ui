import { clsx } from 'clsx'

export interface THeadProps extends React.ComponentPropsWithoutRef<'thead'> {
  children: React.ReactNode
}

export function THead({ children, className, ...props }: THeadProps) {
  return (
    <thead {...props} className={clsx('yds-table-header', className)}>
      {children}
    </thead>
  )
}
