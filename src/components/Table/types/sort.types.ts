/** 정렬 방향 (오름차순 / 내림차순) */
export type SortDirection = 'asc' | 'desc'

/** 현재 정렬 상태. null 이면 정렬하지 않은 상태입니다. */
export type SortState<Key extends string = string> = {
  key: Key
  direction: SortDirection
} | null

/** 기본 비교기가 처리할 수 있는 값 */
export type SortableValue = string | number | boolean | Date | null | undefined

/** 행에서 정렬에 사용할 값을 뽑아내는 함수 */
export type SortAccessor<Row> = (row: Row) => SortableValue

/** 두 행을 직접 비교하는 함수 (오름차순 기준, Array.prototype.sort 와 동일한 규약) */
export type SortComparator<Row> = (a: Row, b: Row) => number
