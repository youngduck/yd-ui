import { clsx } from 'clsx'
import { Children, cloneElement, isValidElement, useContext, type ReactElement, type ReactNode } from 'react'
import { TableContext } from './Table'

export interface THeadProps extends React.ComponentPropsWithoutRef<'thead'> {
  children: React.ReactNode
}

// 헤더 행(Tr)의 Th 자식들에 열 순서대로 _colIndex를 자동 주입
function injectColumnIndex(children: ReactNode): ReactNode {
  return Children.map(children, row => {
    if (!isValidElement(row)) return row
    const rowEl = row as ReactElement<{ children?: ReactNode }>
    const cells = Children.map(rowEl.props.children, (cell, index) =>
      isValidElement(cell)
        ? cloneElement(cell as ReactElement<{ _colIndex?: number }>, { _colIndex: index })
        : cell,
    )
    return cloneElement(rowEl, undefined, cells)
  })
}

export function THead({ children, className, ...props }: THeadProps) {
  const context = useContext(TableContext)
  const scrollable = context?.scrollable || false
  const baseClassName = scrollable ? 'sticky top-0 yds-table-header' : 'yds-table-header'

  return (
    <thead {...props} className={clsx(baseClassName, className)}>
      {injectColumnIndex(children)}
    </thead>
  )
}
