export type SortDirection = 'asc' | 'desc' | null

/** 3단계 순환: null → asc → desc → null */
export const nextSortDirection = (cur: SortDirection): SortDirection =>
  cur === null ? 'asc' : cur === 'asc' ? 'desc' : null
