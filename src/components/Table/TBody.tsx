import { Children, isValidElement, useContext, useMemo, type ReactElement } from 'react'
import { TableContext } from './Table'
import { compareBy, getCellText, inferType } from './utils/sort'

export interface TBodyProps extends React.ComponentPropsWithoutRef<'tbody'> {
  children: React.ReactNode
}

export function TBody({ children, className, ...props }: TBodyProps) {
  const context = useContext(TableContext)
  const activeIndex = context?.sort.activeIndex ?? null
  const direction = context?.sort.direction ?? null

  const content = useMemo(() => {
    // 정렬이 비활성일 땐 원본 children을 그대로 (키·구조 보존)
    if (activeIndex === null || direction === null) return children

    const rows = Children.toArray(children).filter(isValidElement) as ReactElement[]
    const cellTexts = rows.map(row => getCellText(row, activeIndex))
    const type = inferType(cellTexts)
    const dir = direction === 'asc' ? 1 : -1

    return rows
      .map((row, i) => ({ row, key: cellTexts[i] }))
      .sort((a, b) => compareBy(type, a.key, b.key) * dir)
      .map(x => x.row)
  }, [children, activeIndex, direction])

  return (
    <tbody {...props} className={className}>
      {content}
    </tbody>
  )
}
