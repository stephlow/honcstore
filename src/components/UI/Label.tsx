import type { PropsWithChildren } from "hono/jsx";

type LabelProps = PropsWithChildren;

export function Label({ children }: LabelProps) {
  return <label className="">{children}</label>;
}
