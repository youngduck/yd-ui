/**
 * 작성자: KYD
 * 기능: PagedCard 내부 상태(현재 페이지/전체 개수/이동)를 하위 컴포넌트에 공유하는 Context
 */
import { createContext, useContext } from 'react'

export interface PagedCardContextType {
  /** 현재 활성 페이지 인덱스 (0-based) */
  current: number
  /** 전체 페이지 개수 */
  count: number
  /** 특정 인덱스로 이동 (범위를 벗어나면 clamp) */
  goTo: (index: number) => void
}

export const PagedCardContext = createContext<PagedCardContextType | null>(null)

export function usePagedCard() {
  const ctx = useContext(PagedCardContext)
  if (!ctx) {
    throw new Error('PagedCard 하위 컴포넌트는 <PagedCard> 내부에서만 사용할 수 있습니다.')
  }
  return ctx
}
