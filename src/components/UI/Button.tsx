import type { PropsWithChildren } from "hono/jsx";

type ButtonProps = PropsWithChildren<{
  onClick?: () => void;
}>;

export function Button({ children, onClick }: ButtonProps) {
  return (
    <button
      className="p-4 bg-pink-950 text-pink-500 rounded hover:bg-pink-800"
      type="button"
      onClick={onClick}
    >
      {children}
    </button>
  );
}
