import type { SortAccessor, SortComparator, SortDirection, SortableValue } from '../types/sort.types'

const isEmptyValue = (value: SortableValue): value is null | undefined => value === null || value === undefined

/**
 * 기본 비교기. 오름차순 기준으로 두 값을 비교합니다.
 * - Date: 시간 값 순
 * - number / boolean: 값 크기 순
 * - 그 외: 문자열로 변환 후 locale 비교 (numeric 옵션으로 "항목 2" < "항목 10" 자연 정렬)
 */
export function compareSortableValues(a: SortableValue, b: SortableValue, locale = 'ko'): number {
  if (a instanceof Date || b instanceof Date) {
    return new Date(a as string | number | Date).getTime() - new Date(b as string | number | Date).getTime()
  }
  if (typeof a === 'number' && typeof b === 'number') {
    return a - b
  }
  if (typeof a === 'boolean' && typeof b === 'boolean') {
    return Number(a) - Number(b)
  }
  return String(a).localeCompare(String(b), locale, { numeric: true, sensitivity: 'base' })
}

export interface SortRowsOptions<Row> {
  /** 정렬 방향 */
  direction: SortDirection
  /** 행에서 정렬 값을 뽑아내는 함수 (comparator 가 없을 때 사용) */
  accessor?: SortAccessor<Row>
  /** 행을 직접 비교하는 함수 (오름차순 기준). 지정하면 accessor 보다 우선합니다. */
  comparator?: SortComparator<Row>
  /** 문자열 비교에 사용할 locale */
  locale?: string
}

/**
 * 행 배열을 정렬해 새 배열로 반환합니다. 원본 배열은 변경하지 않습니다.
 *
 * accessor 로 정렬하는 경우 빈 값(null·undefined)은 정렬 방향과 무관하게 항상 뒤로 보냅니다.
 * comparator 를 직접 넘긴 경우 빈 값 처리도 comparator 의 책임입니다.
 */
export function sortRows<Row>(rows: readonly Row[], options: SortRowsOptions<Row>): Row[] {
  const { direction, accessor, comparator, locale = 'ko' } = options
  const sign = direction === 'asc' ? 1 : -1

  if (comparator) {
    return [...rows].sort((a, b) => sign * comparator(a, b))
  }
  if (!accessor) {
    return [...rows]
  }

  // 빈 값을 가진 행은 정렬 대상에서 분리해 항상 마지막에 붙입니다.
  const filled: Row[] = []
  const empty: Row[] = []
  rows.forEach(row => (isEmptyValue(accessor(row)) ? empty : filled).push(row))

  filled.sort((a, b) => sign * compareSortableValues(accessor(a), accessor(b), locale))

  return [...filled, ...empty]
}
