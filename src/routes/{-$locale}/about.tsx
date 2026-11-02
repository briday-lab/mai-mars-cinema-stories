import { createFileRoute } from "@tanstack/react-router";
import { Nav, Footer } from "@/components/SiteChrome";
import { alternateLinks, dict, langFromParam, useT } from "@/lib/i18n";

const festival = { url: "/images/festival-presentation.jpg" };
const festivalTeam = { url: "/images/festival-team.jpg" };

// Portraits keyed by producer name (names are the same in both languages).
const portraits: Record<string, string> = {
  "Yvette Umukundwa": "/images/yvette-umukundwa.jpg",
  "Richard Mugwaneza": "/images/richard-mugwaneza.jpg",
};

export const Route = createFileRoute("/{-$locale}/about")({
  head: ({ params }) => {
    const t = dict[langFromParam(params.locale)];
    return {
      meta: [
        { title: t.about.title },
        { name: "description", content: t.about.description },
        { property: "og:title", content: t.about.ogTitle },
        { property: "og:description", content: t.about.ogDescription },
      ],
      links: alternateLinks("/about"),
    };
  },
  component: About,
});

function About() {
  const t = useT().about;
  return (
    <div className="bg-background">
      <Nav />
      <section className="relative h-[70vh] min-h-[480px] overflow-hidden">
        <img
          src={festival.url}
          alt={t.heroAlt}
          width={1920}
          height={1088}
          className="absolute inset-0 h-full w-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-[image:var(--gradient-veil)]" />
        <div className="relative mx-auto flex h-full max-w-7xl flex-col justify-end px-6 pb-16 md:px-12">
          <p className="eyebrow text-primary">{t.eyebrow}</p>
          <h1 className="mt-4 max-w-4xl font-display text-5xl leading-tight text-foreground md:text-7xl">
            {t.heading}
          </h1>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-28 md:px-12">
        <p className="font-display text-2xl leading-relaxed text-foreground md:text-3xl">
          {t.intro}
        </p>
        <p className="mt-8 text-lg leading-relaxed text-muted-foreground">{t.mission}</p>
      </section>

      <section className="mx-auto grid max-w-7xl gap-px border-y border-border bg-border md:grid-cols-3">
        {t.pillars.map((p) => (
          <div key={p.t} className="bg-background px-8 py-14">
            <p className="font-display text-3xl text-primary">{p.t}</p>
            <p className="mt-4 text-muted-foreground">{p.d}</p>
          </div>
        ))}
      </section>

      <section className="mx-auto max-w-7xl px-6 py-28 md:px-12">
        <p className="eyebrow text-primary">{t.festivalEyebrow}</p>
        <div className="mt-12 grid items-center gap-12 md:grid-cols-2">
          <img
            src={festivalTeam.url}
            alt={t.festivalAlt}
            width={1920}
            height={1088}
            className="w-full object-cover"
          />
          <p className="font-display text-2xl leading-relaxed text-foreground md:text-3xl">
            {t.festivalText}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-28 md:px-12">
        <p className="eyebrow text-primary">{t.producersEyebrow}</p>
        <div className="mt-12 grid gap-16 md:grid-cols-2">
          {t.producers.map((p, i) => (
            <div key={i}>
              {portraits[p.name] && (
                <figure className="group relative mb-10 max-w-sm">
                  <div
                    aria-hidden
                    className="absolute -bottom-3 -right-3 h-full w-full border border-primary/40 transition-transform duration-700 group-hover:translate-x-1 group-hover:translate-y-1"
                  />
                  <div className="relative aspect-[4/5] overflow-hidden bg-card">
                    <img
                      src={portraits[p.name]}
                      alt={p.name}
                      loading="lazy"
                      width={800}
                      height={1000}
                      className="h-full w-full object-cover grayscale contrast-110 transition-all duration-700 group-hover:scale-[1.03] group-hover:grayscale-0"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
                  </div>
                </figure>
              )}
              <h3 className="font-display text-4xl text-foreground">{p.name}</h3>
              <p className="eyebrow mt-3 text-muted-foreground">{p.role}</p>
              <p className="mt-6 leading-relaxed text-muted-foreground">{p.bio}</p>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
}
