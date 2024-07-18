import type { PropsWithChildren } from "hono/jsx";

type ButtonProps = PropsWithChildren<{
  onClick?: () => void;
}>;

export function Button({ children, onClick }: ButtonProps) {
  return (
    <button
      className="p-4 bg-pink-500 text-pink-950 rounded hover:bg-pink-600 hover:text-pink-950"
      type="button"
      onClick={onClick}
    >
      {children}
    </button>
  );
}
