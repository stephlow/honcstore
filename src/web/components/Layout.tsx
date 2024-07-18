import type { JSX, ReactNode } from "hono/jsx";
import { Header } from "./Header";

type LayoutProps = {
  children: ReactNode | JSX.Element;
};

export function Layout({ children }: LayoutProps) {
  return (
    <html lang="en">
      {/* @ts-ignore */}
      {import.meta.env.PROD ? (
        <script type='module' src='/static/client.js' />
      ) : (
        <script type='module' src='/src/client/index.tsx' />
      )}
      <body>
        <Header />
        <div id="root" />
        {children}
      </body>
    </html>
  )
}
