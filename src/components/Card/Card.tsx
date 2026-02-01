import { clsx } from 'clsx'

type CardProps = {
  children: React.ReactNode
  className?: string
} & React.ComponentPropsWithoutRef<'div'>

export function Card({ children, className = '', ...props }: CardProps) {
  return (
    <div className={clsx('yds-card', 'card-navy-50', className)} {...props}>
      {children}
    </div>
  )
}

Card.displayName = 'Card'
