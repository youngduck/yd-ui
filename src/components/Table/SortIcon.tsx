import type { SortDirection } from './types/sort.types'

export interface SortIconProps {
  /** 활성화할 방향. null 이면 두 화살표 모두 비활성 상태입니다. */
  direction: SortDirection | null
}

/** 정렬 가능한 헤더 셀에 표시되는 위·아래 화살표 아이콘 */
export function SortIcon({ direction }: SortIconProps) {
  return (
    <svg
      className="yds-table-sort-icon"
      viewBox="0 0 12 12"
      aria-hidden="true"
      focusable="false"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        className="yds-table-sort-icon-arrow"
        data-active={direction === 'asc'}
        d="M6 1.5 9.5 5.5H2.5z"
        fill="currentColor"
      />
      <path
        className="yds-table-sort-icon-arrow"
        data-active={direction === 'desc'}
        d="M6 10.5 2.5 6.5h7z"
        fill="currentColor"
      />
    </svg>
  )
}
