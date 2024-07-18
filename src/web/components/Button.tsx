import type { PropsWithChildren } from "hono/jsx";

type ButtonProps = PropsWithChildren<{
  onClick?: () => void;
}>;

export function Button({ children, onClick }: ButtonProps) {
  return (
    <button
      className="p-4 bg-cyan-500 text-cyan-800 rounded"
      type="button"
      onClick={onClick}
    >
      {children}
    </button>
  );
}
