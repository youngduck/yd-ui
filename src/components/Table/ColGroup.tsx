export interface ColGroupProps extends React.ComponentPropsWithoutRef<'colgroup'> {
  children: React.ReactNode
}

export function ColGroup({ children, ...props }: ColGroupProps) {
  return <colgroup {...props}>{children}</colgroup>
}
