import { cva, type VariantProps } from 'class-variance-authority'

const chipsVariants = cva('yds-chips', {
  variants: {
    variant: {
      fill: '',
      outlined: 'bg-transparent border-2',
    },
    color: {
      primary: '',
    },
  },
  compoundVariants: [
    // Fill
    {
      variant: 'fill',
      color: 'primary',
      class: 'yds-chips-fill-primary',
    },
    // Outlined
    {
      variant: 'outlined',
      color: 'primary',
      class: 'yds-chips-outlined-primary',
    },
  ],
  defaultVariants: {
    variant: 'fill',
    color: 'primary',
  },
})

// 타입 export
export type ChipsVariant = VariantProps<typeof chipsVariants>['variant']
export type ChipsColor = VariantProps<typeof chipsVariants>['color']

type ChipsProps = {
  children: React.ReactNode
} & React.ComponentPropsWithoutRef<'div'> &
  VariantProps<typeof chipsVariants>

export function Chips({
  variant,
  color,
  children,
  ...props
}: ChipsProps) {
  return (
    <div
      className={chipsVariants({ variant, color })}
      {...props}
    >
      {children}
    </div>
  )
}

Chips.displayName = 'Chips'
