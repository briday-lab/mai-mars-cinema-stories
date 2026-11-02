import { createFileRoute } from "@tanstack/react-router";
import { films } from "@/lib/films";
import { Nav, Footer } from "@/components/SiteChrome";

export const Route = createFileRoute("/slate")({
  head: () => ({
    meta: [
      { title: "Slate — Muntu, Inkoni, Scène de Rêve | Mai Mars" },
      { name: "description", content: "Current slate of Les Productions du Mai Mars: Muntu, Inkoni and Scène de Rêve — loglines, status and trailers." },
      { property: "og:title", content: "The Slate — Les Productions du Mai Mars" },
      { property: "og:description", content: "Muntu, Inkoni and Scène de Rêve: our current feature films." },
    ],
  }),
  component: Slate,
});

function Slate() {
  return (
    <div className="bg-background">
      <Nav />
      <header className="mx-auto max-w-7xl px-6 pb-16 pt-40 md:px-12">
        <p className="eyebrow text-primary">Current slate</p>
        <h1 className="mt-4 font-display text-5xl text-foreground md:text-7xl">Films</h1>
      </header>
      {films.map((f, idx) => (
        <article key={f.slug} className="mx-auto max-w-7xl border-t border-border px-6 py-20 md:px-12">
          <div className="grid gap-12 md:grid-cols-12">
            <div className="md:col-span-4">
              <p className="eyebrow text-muted-foreground">0{idx + 1} — {f.status}</p>
              <h2 className="mt-4 font-display text-5xl text-foreground md:text-6xl">{f.title}</h2>
              <p className="eyebrow mt-6 text-primary">{f.format}</p>
              <p className="mt-8 font-display text-xl italic leading-relaxed text-foreground/90">"{f.logline}"</p>
            </div>
            <div className="md:col-span-8">
              <div className="relative aspect-video overflow-hidden bg-card">
                {f.vimeoId ? (
                  <iframe
                    src={`https://player.vimeo.com/video/${f.vimeoId}?title=0&byline=0&portrait=0`}
                    className="absolute inset-0 h-full w-full"
                    allow="autoplay; fullscreen; picture-in-picture"
                    allowFullScreen
                    title={`${f.title} trailer`}
                  />
                ) : (
                  <>
                    <img src={f.image} alt={f.title} loading="lazy" width={1920} height={1088} className={`h-full w-full ${f.poster ? "object-contain" : "object-cover"}`} />
                    <div className="absolute inset-0 flex items-end bg-gradient-to-t from-background/80 to-transparent p-6">
                      <span className="eyebrow text-primary">Trailer coming soon</span>
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
