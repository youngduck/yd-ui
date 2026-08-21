/**
 * 작성자: KYD
 * 기능: PagedCard 우측 상단 페이지 인디케이터(동그라미). 클릭으로 해당 페이지 이동
 */
import { clsx } from 'clsx'

import { usePagedCard } from './context'

export type PagedCardDotsProps = React.ComponentPropsWithoutRef<'div'>

export function PagedCardDots({ className, ...props }: PagedCardDotsProps) {
  const { current, count, goTo } = usePagedCard()

  if (count <= 1) return null

  return (
    <div {...props} role="tablist" className={clsx('yds-paged-card-dots', className)}>
      {Array.from({ length: count }).map((_, index) => (
        <button
          key={index}
          type="button"
          role="tab"
          aria-selected={index === current}
          aria-label={`${index + 1}번째 페이지로 이동`}
          className={clsx('yds-paged-card-dot', index === current && 'yds-paged-card-dot-active')}
          onClick={() => goTo(index)}
        />
      ))}
    </div>
  )
}

PagedCardDots.displayName = 'PagedCard.Dots'
