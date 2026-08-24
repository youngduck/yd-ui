import { useCallback, useMemo, useState } from 'react'
import type { SortAccessor, SortComparator, SortDirection, SortState, SortableValue } from '../types/sort.types'
import { sortRows } from '../utils/sortRows'

export interface UseTableSortConfig<Row, Key extends string> {
  /** 초기 정렬 상태 (비제어 모드) */
  defaultSort?: SortState<Key>
  /** 정렬 상태를 외부에서 제어할 때 사용 (제어 모드) */
  sort?: SortState<Key>
  /** 정렬 상태가 바뀔 때 호출 */
  onSortChange?: (sort: SortState<Key>) => void
  /** 컬럼 키별로 정렬 값을 뽑아내는 함수. 지정하지 않으면 row[key] 를 사용합니다. */
  accessors?: Partial<Record<Key, SortAccessor<Row>>>
  /** 컬럼 키별 커스텀 비교기 (오름차순 기준). accessors 보다 우선합니다. */
  comparators?: Partial<Record<Key, SortComparator<Row>>>
  /** 정렬 해제를 순환에 포함할지 여부 (true: 오름차순 → 내림차순 → 해제) */
  allowUnsorted?: boolean
  /** 문자열 비교에 사용할 locale */
  locale?: string
  /** true 면 데이터를 정렬하지 않고 상태만 관리합니다. (서버 정렬 연동용) */
  manual?: boolean
}

/** Th 컴포넌트에 그대로 펼쳐 넣을 수 있는 정렬 props */
export interface SortableThProps {
  sortable: true
  sortDirection: SortDirection | null
  onSortToggle: () => void
}

export interface UseTableSortReturn<Row, Key extends string> {
  /** 정렬이 적용된 데이터 (manual 모드에서는 원본 그대로) */
  sortedData: Row[]
  /** 현재 정렬 상태 */
  sortState: SortState<Key>
  /** 현재 정렬 중인 컬럼 키 */
  sortKey: Key | null
  /** 현재 정렬 방향 */
  sortDirection: SortDirection | null
  /** 해당 컬럼의 정렬을 다음 단계로 순환시킵니다. */
  toggleSort: (key: Key) => void
  /** 정렬 상태를 직접 지정합니다. */
  setSort: (sort: SortState<Key>) => void
  /** 정렬을 해제합니다. */
  resetSort: () => void
  /** `<Th {...getSortProps('name')}>` 형태로 사용하는 헬퍼 */
  getSortProps: (key: Key) => SortableThProps
}

/**
 * 테이블 정렬 상태와 정렬된 데이터를 관리하는 훅입니다.
 *
 * @example
 * const { sortedData, getSortProps } = useTableSort(users, { defaultSort: { key: 'age', direction: 'asc' } })
 *
 * <Th {...getSortProps('name')}>이름</Th>
 *
 * 정렬 키는 기본적으로 Row 의 키에서 추론합니다. 파생 컬럼처럼 Row 에 없는 키로 정렬하려면
 * `useTableSort<Member, 'name' | 'fullName'>(members, { accessors: { ... } })` 처럼 키를 직접 지정하세요.
 */
export function useTableSort<Row, Key extends string = Extract<keyof Row, string>>(
  data: readonly Row[],
  config: UseTableSortConfig<Row, NoInfer<Key>> = {},
): UseTableSortReturn<Row, Key> {
  const {
    defaultSort = null,
    sort,
    onSortChange,
    accessors,
    comparators,
    allowUnsorted = false,
    locale = 'ko',
    manual = false,
  } = config

  const isControlled = sort !== undefined
  const [internalSort, setInternalSort] = useState<SortState<Key>>(defaultSort)
  const sortState = isControlled ? sort : internalSort

  const setSort = useCallback(
    (next: SortState<Key>) => {
      if (!isControlled) {
        setInternalSort(next)
      }
      onSortChange?.(next)
    },
    [isControlled, onSortChange],
  )

  const toggleSort = useCallback(
    (key: Key) => {
      // 다른 컬럼을 누르면 항상 오름차순부터 시작합니다.
      if (!sortState || sortState.key !== key) {
        setSort({ key, direction: 'asc' })
        return
      }
      if (sortState.direction === 'asc') {
        setSort({ key, direction: 'desc' })
        return
      }
      // 내림차순 다음 단계는 allowUnsorted 여부에 따라 해제 또는 오름차순입니다.
      setSort(allowUnsorted ? null : { key, direction: 'asc' })
    },
    [allowUnsorted, setSort, sortState],
  )

  const resetSort = useCallback(() => setSort(null), [setSort])

  const sortedData = useMemo(() => {
    if (manual || !sortState) {
      return [...data]
    }
    const { key, direction } = sortState
    return sortRows(data, {
      direction,
      comparator: comparators?.[key],
      accessor: accessors?.[key] ?? ((row: Row) => (row as Record<string, SortableValue>)[key]),
      locale,
    })
  }, [accessors, comparators, data, locale, manual, sortState])

  const getSortProps = useCallback(
    (key: Key): SortableThProps => ({
      sortable: true,
      sortDirection: sortState?.key === key ? sortState.direction : null,
      onSortToggle: () => toggleSort(key),
    }),
    [sortState, toggleSort],
  )

  return {
    sortedData,
    sortState,
    sortKey: sortState?.key ?? null,
    sortDirection: sortState?.direction ?? null,
    toggleSort,
    setSort,
    resetSort,
    getSortProps,
  }
}
