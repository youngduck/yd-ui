/**
 * 작성자: KYD
 * 기능: 여러 페이지를 담고 우측 상단 dot 클릭으로 전환하는 카드 컴포넌트
 * 프로세스 설명:
 *  - yd-ui Card(surface)를 감싸 헤더(제목 + dot 페이저) / 뷰포트(트랙 슬라이드)를 구성
 *  - Context(PagedCardContext)로 current/count/goTo 를 하위(Header·Dots)에 공유 (Table 과 동일한 compound 패턴)
 *  - 페이지 전환 애니메이션은 별도 라이브러리 없이 CSS transform translateX + transition 으로 처리
 *  - page/onPageChange 로 제어(controlled), defaultPage 로 비제어(uncontrolled) 모두 지원
 */
import { clsx } from 'clsx'
import { Children, isValidElement, useState } from 'react'

import { Card, type CardVariant } from '../Card/Card'
import { PagedCardContext } from './context'
import { PagedCardDots } from './PagedCardDots'
import { PagedCardHeader } from './PagedCardHeader'
import { PagedCardPage } from './PagedCardPage'

export interface PagedCardProps extends Omit<React.ComponentPropsWithoutRef<'div'>, 'children'> {
  children: React.ReactNode
  /** 카드 표면 variant (Card 와 동일하게 기본 outlined) */
  variant?: CardVariant
  /** 제어 모드: 현재 페이지 인덱스 */
  page?: number
  /** 비제어 모드: 초기 페이지 인덱스 (기본 0) */
  defaultPage?: number
  /** 페이지 변경 콜백 */
  onPageChange?: (index: number) => void
}

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max)

function PagedCardRoot({
  children,
  variant = 'outlined',
  page,
  defaultPage = 0,
  onPageChange,
  className,
  ...props
}: PagedCardProps) {
  const childArray = Children.toArray(children)
  const headers = childArray.filter((child) => isValidElement(child) && child.type === PagedCardHeader)
  const pages = childArray.filter((child) => isValidElement(child) && child.type === PagedCardPage)
  const count = pages.length

  // 개발 모드 경고: 직접 자식은 PagedCard.Header / PagedCard.Page 만 인식된다.
  // Fragment(<>...</>)나 다른 컴포넌트로 감싼 자식은 타입이 달라 조용히 무시되므로 미리 알린다.
  if (process.env.NODE_ENV !== 'production') {
    const unrecognized = childArray.filter(
      (child) => isValidElement(child) && child.type !== PagedCardHeader && child.type !== PagedCardPage,
    )
    if (unrecognized.length > 0) {
      console.warn(
        '[PagedCard] 직접 자식은 <PagedCard.Header> 또는 <PagedCard.Page> 여야 합니다. ' +
          'Fragment(<>...</>)나 다른 컴포넌트로 감싼 자식은 렌더되지 않고 무시됩니다.',
      )
    }
  }
  const maxIndex = Math.max(count - 1, 0)

  const isControlled = page !== undefined
  const [internalPage, setInternalPage] = useState(() => clamp(defaultPage, 0, maxIndex))
  const current = clamp(isControlled ? (page as number) : internalPage, 0, maxIndex)

  const goTo = (index: number) => {
    const next = clamp(index, 0, maxIndex)
    if (next === current) return
    if (!isControlled) setInternalPage(next)
    onPageChange?.(next)
  }

  return (
    <PagedCardContext.Provider value={{ current, count, goTo }}>
      <Card variant={variant} className={clsx('yds-paged-card', className)} {...props}>
        {headers}
        <div className="yds-paged-card-viewport">
          <div className="yds-paged-card-track" style={{ transform: `translateX(-${current * 100}%)` }}>
            {pages.map((pageNode, index) => (
              <div className="yds-paged-card-slide" key={index} aria-hidden={index !== current}>
                {pageNode}
              </div>
            ))}
          </div>
        </div>
      </Card>
    </PagedCardContext.Provider>
  )
}

PagedCardRoot.displayName = 'PagedCard'

export const PagedCard = Object.assign(PagedCardRoot, {
  Header: PagedCardHeader,
  Page: PagedCardPage,
  Dots: PagedCardDots,
})
