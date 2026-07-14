/**
 * 작성자: KYD
 * 기능: 자식들을 수평으로 나열(공간 부족 시 줄바꿈)하고 간격을 spacing 토큰으로 강제하는 레이아웃 컴포넌트
 * 프로세스 설명: 버튼 그룹, 칩 목록, 필터 바처럼 가로로 흐르는 요소 배치에 사용합니다
 */

import { cva, type VariantProps } from 'class-variance-authority'

const inlineVariants = cva('yds-inline', {
  variants: {
    gap: {
      sm: 'yds-inline-gap-sm',
      md: 'yds-inline-gap-md',
      lg: 'yds-inline-gap-lg',
    },
    align: {
      start: 'yds-inline-align-start',
      center: 'yds-inline-align-center',
      end: 'yds-inline-align-end',
    },
    justify: {
      start: 'yds-inline-justify-start',
      center: 'yds-inline-justify-center',
      end: 'yds-inline-justify-end',
      between: 'yds-inline-justify-between',
    },
  },
  defaultVariants: {
    gap: 'md',
    align: 'center',
    justify: 'start',
  },
})

// 타입 export
export type InlineGap = VariantProps<typeof inlineVariants>['gap']
export type InlineAlign = VariantProps<typeof inlineVariants>['align']
export type InlineJustify = VariantProps<typeof inlineVariants>['justify']

type InlineProps = React.ComponentPropsWithoutRef<'div'> & VariantProps<typeof inlineVariants>

export function Inline({ gap, align, justify, className = '', ...props }: InlineProps) {
  return <div className={`${inlineVariants({ gap, align, justify })} ${className}`} {...props} />
}

Inline.displayName = 'Inline'
