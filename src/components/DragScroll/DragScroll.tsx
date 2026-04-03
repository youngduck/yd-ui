type DragScrollProps = {
  children: React.ReactNode
}

export function DragScroll({ children }: DragScrollProps) {
  return <div>{children}</div>
}

DragScroll.displayName = 'DragScroll'
