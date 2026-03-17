export type ColProps = React.ComponentPropsWithoutRef<"col">;

export function Col({ ...props }: ColProps) {
  return <col {...props} />
}
