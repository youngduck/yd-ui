/**
 * 작성자: KYD
 * 기능: 자식들을 수직으로 나열하고 간격을 spacing 토큰으로 강제하는 레이아웃 컴포넌트
 * 프로세스 설명: 화면마다 임의의 gap 값을 쓰지 않도록 sm/md/lg 세 가지 간격만 허용합니다
 */

import { cva, type VariantProps } from 'class-variance-authority'

const stackVariants = cva('yds-stack', {
  variants: {
    gap: {
      sm: 'yds-stack-gap-sm',
      md: 'yds-stack-gap-md',
      lg: 'yds-stack-gap-lg',
    },
    align: {
      start: 'yds-stack-align-start',
      center: 'yds-stack-align-center',
      end: 'yds-stack-align-end',
      stretch: 'yds-stack-align-stretch',
    },
  },
  defaultVariants: {
    gap: 'md',
    align: 'stretch',
  },
})

// 타입 export
export type StackGap = VariantProps<typeof stackVariants>['gap']
export type StackAlign = VariantProps<typeof stackVariants>['align']

type StackProps = React.ComponentPropsWithoutRef<'div'> & VariantProps<typeof stackVariants>

export function Stack({ gap, align, className = '', ...props }: StackProps) {
  return <div className={`${stackVariants({ gap, align })} ${className}`} {...props} />
}

Stack.displayName = 'Stack'
