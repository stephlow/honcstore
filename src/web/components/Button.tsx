import type { ReactNode } from "hono/jsx";

type ButtonProps = {
  children: ReactNode;
};

export function Button({ children }: ButtonProps) {
  return (
    <button className="p-4 bg-cyan-500 text-cyan-800 rounded" type="button">
      {children}
    </button>
  );
}
