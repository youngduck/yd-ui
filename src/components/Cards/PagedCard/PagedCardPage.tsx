/**
 * 작성자: KYD
 * 기능: PagedCard 한 페이지의 콘텐츠 컨테이너. 루트(PagedCard)가 이 타입을 식별해 슬라이드로 배치
 */
import { clsx } from 'clsx'

export interface PagedCardPageProps extends React.ComponentPropsWithoutRef<'div'> {
  children: React.ReactNode
}

export function PagedCardPage({ children, className, ...props }: PagedCardPageProps) {
  return (
    <div {...props} className={clsx('yds-paged-card-page', className)}>
      {children}
    </div>
  )
}

PagedCardPage.displayName = 'PagedCard.Page'
