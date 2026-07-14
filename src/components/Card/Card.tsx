/**
 * 작성자: KYD
 * 기능: 콘텐츠를 담는 면(surface) 컴포넌트
 * 프로세스 설명: outlined(테두리) / filled(배경) 두 가지 variant 로 대시보드 타일, 패널, 폼 컨테이너 등에 사용
 */

import { cva, type VariantProps } from 'class-variance-authority'

const cardVariants = cva('yds-card', {
  variants: {
    variant: {
      /** 테두리로 영역을 구분 (기본) */
      outlined: 'yds-card-outlined',
      /** 배경색으로 영역을 구분 (대시보드 타일, 패널 등) */
      filled: 'yds-card-filled',
    },
  },
  defaultVariants: {
    variant: 'outlined',
  },
})

// 타입 export
export type CardVariant = VariantProps<typeof cardVariants>['variant']

type CardProps = {
  children: React.ReactNode
} & React.ComponentPropsWithoutRef<'div'> &
  VariantProps<typeof cardVariants>

export function Card({ variant, children, className = '', ...props }: CardProps) {
  return (
    <div className={`${cardVariants({ variant })} ${className}`} {...props}>
      {children}
    </div>
  )
}

Card.displayName = 'Card'
