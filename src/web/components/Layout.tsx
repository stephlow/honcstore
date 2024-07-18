import type { PropsWithChildren } from "hono/jsx";
import { Footer } from "./Footer";
import { Header } from "./Header";

type LayoutProps = PropsWithChildren<{
  title?: string;
}>;

export function Layout({ title, children }: LayoutProps) {
  const pageTitle = [title, "Honcstore"].filter(Boolean).join(" | ");

  return (
    <html lang="en">
      <title>{pageTitle}</title>
      <script src="https://cdn.tailwindcss.com" />
      {/* @ts-ignore */}
      {import.meta.env.PROD ? (
        <script type="module" src="/static/client.js" />
      ) : (
        <script type="module" src="/src/client/index.tsx" />
      )}
      <body>
        <div id="root" />
        <Header />
        <main className="container mx-auto p-8">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
