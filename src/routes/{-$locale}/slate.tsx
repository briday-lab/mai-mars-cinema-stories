import { createFileRoute } from "@tanstack/react-router";
import { useFilms } from "@/lib/films";
import { alternateLinks, dict, langFromParam, useT } from "@/lib/i18n";
import { Nav, Footer } from "@/components/SiteChrome";

export const Route = createFileRoute("/{-$locale}/slate")({
  head: ({ params }) => {
    const t = dict[langFromParam(params.locale)];
    return {
      meta: [
        { title: t.slate.title },
        { name: "description", content: t.slate.description },
        { property: "og:title", content: t.slate.ogTitle },
        { property: "og:description", content: t.slate.ogDescription },
      ],
      links: alternateLinks("/slate"),
    };
  },
  component: Slate,
});

function Slate() {
  const t = useT();
  const films = useFilms();
  return (
    <div className="bg-background">
      <Nav />
      <header className="mx-auto max-w-7xl px-6 pb-16 pt-40 md:px-12">
        <p className="eyebrow text-primary">{t.slate.eyebrow}</p>
        <h1 className="mt-4 font-display text-5xl text-foreground md:text-7xl">
          {t.slate.heading}
        </h1>
      </header>
      {films.map((f, idx) => (
        <article
          key={f.slug}
          className="mx-auto max-w-7xl border-t border-border px-6 py-20 md:px-12"
        >
          <div className="grid gap-12 md:grid-cols-12">
            <div className="md:col-span-4">
              <p className="eyebrow text-muted-foreground">
                0{idx + 1} — {f.status}
              </p>
              <h2 className="mt-4 font-display text-5xl text-foreground md:text-6xl">{f.title}</h2>
              <p className="eyebrow mt-6 text-primary">{f.format}</p>
              <p className="mt-8 font-display text-xl italic leading-relaxed text-foreground/90">
                "{f.logline}"
              </p>
            </div>
            <div className="md:col-span-8">
              <div className="relative aspect-video overflow-hidden bg-card">
                {f.vimeoId ? (
                  <iframe
                    src={`https://player.vimeo.com/video/${f.vimeoId}?${f.vimeoHash ? `h=${f.vimeoHash}&` : ""}title=0&byline=0&portrait=0`}
                    className="absolute inset-0 h-full w-full"
                    allow="autoplay; fullscreen; picture-in-picture"
                    allowFullScreen
                    title={t.slate.trailerTitle(f.title)}
                  />
                ) : (
                  <>
                    <img
                      src={f.image}
                      alt={f.title}
                      loading="lazy"
                      width={1920}
                      height={1088}
                      className={`h-full w-full ${f.poster ? "object-contain" : "object-cover"}`}
                    />
                    <div className="absolute inset-0 flex items-end bg-gradient-to-t from-background/80 to-transparent p-6">
                      <span className="eyebrow text-primary">{t.slate.trailerSoon}</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </article>
      ))}
      <Footer />
    </div>
  );
}
