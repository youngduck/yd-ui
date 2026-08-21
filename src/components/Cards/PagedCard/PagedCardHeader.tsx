/**
 * 작성자: KYD
 * 기능: PagedCard 헤더. 좌측 제목(children) + 우측 상단 dot 페이저를 배치
 */
import { clsx } from 'clsx'

import { PagedCardDots } from './PagedCardDots'

export interface PagedCardHeaderProps extends React.ComponentPropsWithoutRef<'div'> {
  children?: React.ReactNode
  /** 우측 상단 dot 페이저 표시 여부 (기본 true) */
  showDots?: boolean
}

export function PagedCardHeader({ children, className, showDots = true, ...props }: PagedCardHeaderProps) {
  return (
    <div {...props} className={clsx('yds-paged-card-header', className)}>
      <div className="yds-paged-card-header-title">{children}</div>
      {showDots && <PagedCardDots />}
    </div>
  )
}

PagedCardHeader.displayName = 'PagedCard.Header'
