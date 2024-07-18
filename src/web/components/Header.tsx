export function Header() {
  return (
    <header className="mb-16 container mx-auto flex gap-4 p-8 border-b border-slate-200">
      <a href="/" className="font-bold">Honcstore</a>
      <div className="ml-auto flex gap-8">
        <div data-mount="account" />
        <div data-mount="cart" />
      </div>
    </header>
  );
}
