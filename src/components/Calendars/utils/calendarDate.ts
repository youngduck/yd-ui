/**
 * 달력(Calendars) 공통 날짜 유틸.
 * Date 객체 대신 { year, month, day } 숫자 값으로 계산합니다. (month: 1~12)
 */

/** 요일 라벨 (일요일 시작) */
export const CALENDAR_WEEKDAY_LABELS = ['일', '월', '화', '수', '목', '금', '토']

/** 숫자를 두 자리 문자열로 변환 (7 → '07') */
export const pad2 = (value: number) => String(value).padStart(2, '0')

/** 'YYYY' 형식 문자열을 연도 숫자로 변환. 형식이 다르면 null */
export const parseYearValue = (value: string): number | null => {
  if (!/^\d{4}$/.test(value)) return null
  return Number(value)
}

/** 'YYYY-MM' 형식 문자열을 { year, month } 로 변환. 형식이 다르면 null */
export const parseYearMonthValue = (value: string): { year: number; month: number } | null => {
  if (!/^\d{4}-\d{2}$/.test(value)) return null
  const [year, month] = value.split('-').map(Number)
  if (month < 1 || month > 12) return null
  return { year, month }
}

/** 'YYYY-MM-DD' 형식 문자열을 { year, month, day } 로 변환. 달력상 존재하지 않는 날짜면 null */
export const parseDateValue = (value: string): { year: number; month: number; day: number } | null => {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return null
  const [year, month, day] = value.split('-').map(Number)
  if (month < 1 || month > 12) return null
  if (day < 1 || day > getDaysInMonth(year, month)) return null
  return { year, month, day }
}

/** 연도를 'YYYY' 값 문자열로 변환 */
export const formatYearValue = (year: number) => String(year)

/** 연/월을 'YYYY-MM' 값 문자열로 변환 */
export const formatYearMonthValue = (year: number, month: number) => `${year}-${pad2(month)}`

/** 연/월/일을 'YYYY-MM-DD' 값 문자열로 변환 */
export const formatDateValue = (year: number, month: number, day: number) => `${year}-${pad2(month)}-${pad2(day)}`

/** 해당 월의 일수 */
export const getDaysInMonth = (year: number, month: number) => new Date(year, month, 0).getDate()

/** 해당 월 1일의 요일 (0: 일요일 ~ 6: 토요일) */
export const getFirstWeekday = (year: number, month: number) => new Date(year, month - 1, 1).getDay()

/** 오늘 날짜 */
export const getToday = () => {
  const now = new Date()
  return { year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate() }
}

/** 연도를 minYear ~ maxYear 범위로 제한 */
export const clampYear = (year: number, minYear: number, maxYear: number) =>
  Math.min(Math.max(year, minYear), maxYear)

/**
 * 그리드 키보드 탐색 공통 계산.
 * 좌우 방향키는 한 칸, 상하 방향키는 한 행(cols) 단위로 이동하고
 * Home / End 는 현재 행의 처음 / 끝으로 이동합니다.
 * 탐색 키가 아니면 null, 더 이동할 수 없으면 현재 인덱스를 반환합니다.
 */
export const moveGridFocus = (index: number, count: number, cols: number, key: string): number | null => {
  switch (key) {
    case 'ArrowRight':
      return Math.min(index + 1, count - 1)
    case 'ArrowLeft':
      return Math.max(index - 1, 0)
    case 'ArrowDown':
      return index + cols < count ? index + cols : index
    case 'ArrowUp':
      return index - cols >= 0 ? index - cols : index
    case 'Home':
      return index - (index % cols)
    case 'End':
      return Math.min(index - (index % cols) + cols - 1, count - 1)
    default:
      return null
  }
}
