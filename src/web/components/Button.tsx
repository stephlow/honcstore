import type { ReactNode } from "hono/jsx";

type ButtonProps = {
  onClick?: () => void;
  children: ReactNode;
};

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
