import { Link } from "@tanstack/react-router";
import { CONTACT_EMAIL, localeParam, rememberLang, useLang, useT } from "@/lib/i18n";

export function Nav() {
  const t = useT();
  const lang = useLang();
  const other = lang === "fr" ? "en" : "fr";
  const locale = localeParam(lang);
  const link = "eyebrow text-muted-foreground transition-colors hover:text-primary";
  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-gradient-to-b from-background/90 to-transparent">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 md:px-12">
        <Link
          to="/{-$locale}"
          params={{ locale }}
          className="font-display text-xl tracking-wide text-foreground"
        >
          Mai Mars
        </Link>
        <div className="flex items-center gap-4 sm:gap-6 md:gap-10">
          <Link
            to="/{-$locale}"
            params={{ locale }}
            className={`${link} hidden sm:inline`}
            activeOptions={{ exact: true }}
            activeProps={{ className: "text-primary" }}
          >
            {t.nav.home}
          </Link>
          <Link
            to="/{-$locale}/slate"
            params={{ locale }}
            className={link}
            activeProps={{ className: "text-primary" }}
          >
            {t.nav.slate}
          </Link>
          <Link
            to="/{-$locale}/about"
            params={{ locale }}
            className={link}
            activeProps={{ className: "text-primary" }}
          >
            {t.nav.about}
          </Link>
          <Link
            to="/{-$locale}/contact"
            params={{ locale }}
            className={link}
            activeProps={{ className: "text-primary" }}
          >
            {t.nav.contact}
          </Link>
          <Link
            to="."
            params={(prev: Record<string, string | undefined>) => ({
              ...prev,
              locale: localeParam(other),
            })}
            onClick={() => rememberLang(other)}
            hrefLang={other}
            lang={other}
            aria-label={t.switchLabel}
            title={t.switchLabel}
            className="eyebrow border border-border px-2.5 py-1 text-muted-foreground transition-colors hover:border-primary hover:text-primary"
          >
            {t.switchTo}
          </Link>
        </div>
      </nav>
    </header>
  );
}

export function Footer() {
  const t = useT();
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-14 md:flex-row md:items-end md:justify-between md:px-12">
        <div>
          <p className="font-display text-2xl text-foreground">Les Productions du Mai Mars</p>
          <p className="mt-2 text-sm text-muted-foreground">{t.footer.tagline}</p>
        </div>
        <a href={`mailto:${CONTACT_EMAIL}`} className="eyebrow text-primary hover:text-foreground">
          {CONTACT_EMAIL}
        </a>
      </div>
    </footer>
  );
}
