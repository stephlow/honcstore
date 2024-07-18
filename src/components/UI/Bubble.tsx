import type { PropsWithChildren } from "hono/jsx";

type BubbleProps = PropsWithChildren;

export function Bubble({ children }: BubbleProps) {
  return (
    <span class="rounded-full bg-pink-950 text-white block h-4 w-4 flex justify-center align-center text-xs">
      {children}
    </span>
  );
}
