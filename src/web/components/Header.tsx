export function Header() {
  return (
    <header className="container mx-auto flex gap-4 p-8">
      <a href="/" className="font-bold">Honcstore</a>
      <div className="mr-auto" />
      <div data-mount="account" />
      <div data-mount="cart" />
    </header>
  );
}
