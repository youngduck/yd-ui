import { Children, isValidElement, type ReactElement, type ReactNode } from 'react'

/** Td children(문자열/숫자/JSX)에서 정렬용 텍스트만 추출 */
export function extractText(node: ReactNode): string {
  if (node == null || typeof node === 'boolean') return ''
  if (typeof node === 'string' || typeof node === 'number') return String(node)
  if (Array.isArray(node)) return node.map(extractText).join('')
  if (isValidElement(node)) return extractText((node.props as { children?: ReactNode }).children)
  return ''
}

/** Tr 엘리먼트에서 index번째 Td의 텍스트를 추출 */
export function getCellText(row: ReactElement, index: number): string {
  const cells = Children.toArray((row.props as { children?: ReactNode }).children)
  return extractText(cells[index])
}

type ColumnType = 'number' | 'date' | 'string'

/** 컬럼 전체 값을 보고 타입을 한 번 추론 (행마다 흔들리지 않게) */
export function inferType(values: string[]): ColumnType {
  const nonEmpty = values.filter(v => v.trim() !== '')
  if (nonEmpty.length === 0) return 'string'
  if (nonEmpty.every(v => !isNaN(Number(v)))) return 'number'
  if (nonEmpty.every(v => !isNaN(Date.parse(v)))) return 'date'
  return 'string'
}

/** 추론된 타입에 맞춰 두 값을 비교 (빈 값은 항상 뒤로) */
export function compareBy(type: ColumnType, a: string, b: string): number {
  const aEmpty = a.trim() === ''
  const bEmpty = b.trim() === ''
  if (aEmpty && bEmpty) return 0
  if (aEmpty) return 1
  if (bEmpty) return -1
  if (type === 'number') return Number(a) - Number(b)
  if (type === 'date') return Date.parse(a) - Date.parse(b)
  return a.localeCompare(b, 'ko')
}
