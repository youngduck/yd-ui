export interface TBodyProps extends React.ComponentPropsWithoutRef<'tbody'> {
  children: React.ReactNode
}

export function TBody({ children, className, ...props }: TBodyProps) {
  return (
    <tbody {...props} className={className}>
      {children}
    </tbody>
  )
}
