import { Link } from "@tanstack/react-router";

export function Nav() {
  const link = "eyebrow text-muted-foreground transition-colors hover:text-primary";
  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-gradient-to-b from-background/90 to-transparent">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 md:px-12">
        <Link to="/" className="font-display text-xl tracking-wide text-foreground">
          Mai Mars
        </Link>
        <div className="flex gap-6 md:gap-10">
          <Link to="/" className={link} activeOptions={{ exact: true }} activeProps={{ className: "text-primary" }}>Home</Link>
          <Link to="/slate" className={link} activeProps={{ className: "text-primary" }}>Slate</Link>
          <Link to="/about" className={link} activeProps={{ className: "text-primary" }}>About</Link>
        </div>
      </nav>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-14 md:flex-row md:items-end md:justify-between md:px-12">
        <div>
          <p className="font-display text-2xl text-foreground">Les Productions du Mai Mars</p>
          <p className="mt-2 text-sm text-muted-foreground">Montréal, Québec · Auteur cinema, African & diasporic roots</p>
        </div>
        <a href="mailto:production.maimars@gmail.com" className="eyebrow text-primary hover:text-foreground">production.maimars@gmail.com</a>
      </div>
    </footer>
  );
}
