import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { films } from "@/lib/films";
import { Nav, Footer } from "@/components/SiteChrome";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Les Productions du Mai Mars — Auteur Cinema from Montréal" },
      { name: "description", content: "Montreal production company crafting independent auteur cinema with African and diasporic roots, through international co-productions." },
      { property: "og:title", content: "Les Productions du Mai Mars" },
      { property: "og:description", content: "Independent auteur cinema with African and diasporic roots, produced from Montréal." },
    ],
  }),
  component: Index,
});

function Index() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % films.length), 6500);
    return () => clearInterval(t);
  }, []);
  const f = films[i] ?? films[0]!;

  return (
    <div className="bg-background">
      <Nav />
      <section className="relative h-screen min-h-[640px] overflow-hidden">
        {films.map((film, idx) =>
          film.poster ? (
            <div
              key={film.slug}
              className={`absolute inset-x-0 bottom-[55%] top-24 flex justify-center px-6 transition-opacity duration-[2000ms] md:bottom-16 md:left-1/2 md:justify-end md:px-12 ${idx === i ? "opacity-100" : "opacity-0"}`}
            >
              <img src={film.image} alt={film.title} className="h-full w-auto object-contain shadow-2xl" />
            </div>
          ) : (
            <img
              key={film.slug}
              src={film.image}
              alt={film.title}
              width={1920}
              height={1088}
              className={`absolute inset-0 h-full w-full object-cover transition-all duration-[2000ms] ${idx === i ? "scale-105 opacity-100" : "scale-100 opacity-0"}`}
            />
          ),
        )}
        <div className={`absolute inset-0 bg-[image:var(--gradient-veil)] transition-opacity duration-[2000ms] ${f.poster ? "opacity-0" : "opacity-100"}`} />
        <div className="relative mx-auto flex h-full max-w-7xl flex-col justify-end px-6 pb-20 md:px-12">
          <p className="eyebrow text-primary">{f.status}</p>
          <h1 key={f.slug} className="mt-4 animate-in fade-in slide-in-from-bottom-4 font-display text-6xl leading-none text-foreground duration-1000 md:text-9xl">
            {f.title}
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground">{f.logline}</p>
          <div className="mt-10 flex items-center gap-8">
            <Link to="/slate" className="eyebrow border border-primary px-6 py-3 text-primary transition-colors hover:bg-primary hover:text-primary-foreground">
              View the slate
            </Link>
            <div className="flex gap-3">
              {films.map((film, idx) => (
                <button key={film.slug} aria-label={`Show ${film.title}`} onClick={() => setI(idx)}
                  className={`h-px w-10 transition-colors ${idx === i ? "bg-primary" : "bg-muted-foreground/40"}`} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-32 text-center md:py-48">
        <p className="eyebrow text-primary">Montréal · Kinshasa · Dakar · Johannesburg</p>
        <p className="mt-8 font-display text-3xl leading-snug text-foreground md:text-5xl">
          We produce auteur cinema rooted in Africa and its diasporas — stories made across borders, for the world's screens.
        </p>
        <Link to="/about" className="eyebrow mt-12 inline-block text-muted-foreground hover:text-primary">About the company →</Link>
      </section>
      <Footer />
    </div>
  );
}
