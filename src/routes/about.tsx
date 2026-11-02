import { createFileRoute } from "@tanstack/react-router";
import { Nav, Footer } from "@/components/SiteChrome";
const festival = { url: "/images/festival-presentation.jpg" };
const festivalTeam = { url: "/images/festival-team.jpg" };

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Les Productions du Mai Mars" },
      { name: "description", content: "International co-productions between Canada, the Global South and Africa. Meet the producers of Les Productions du Mai Mars." },
      { property: "og:title", content: "About Les Productions du Mai Mars" },
      { property: "og:description", content: "Co-producing auteur cinema between Canada, the Global South and Africa." },
    ],
  }),
  component: About,
});

const pillars = [
  { t: "Canada", d: "Montréal-based, eligible for Telefilm, SODEC and Canadian tax credits, with treaty access across 50+ countries." },
  { t: "Africa", d: "Long-standing creative partnerships with producers and crews in Central, West and Southern Africa." },
  { t: "Global South", d: "South–South collaboration that keeps creative authorship with the communities whose stories we tell." },
];

const producers = [
  { name: "Yvette Umukundwa", role: "Founder & Producer", bio: "An independent producer of Rwandan origin based in Montreal, specializing in fiction and documentary. Passionate about African and diasporic narratives, her work highlights the richness of diverse cultures and human experiences. Dedicated to building intercontinental bridges, she actively focuses on international co-production and distribution opportunities between Canada, the Global South, and Africa. She is an alumna of the Voix Invisibles residency (Centre Phi) and Orizon 9's \"Projections!\" program." },
  { name: "Producer Name", role: "Co-Producer", bio: "Specialist in international financing and festival strategy, bridging Canadian public funds with partners across the Global South." },
];

function About() {
  return (
    <div className="bg-background">
      <Nav />
      <section className="relative h-[70vh] min-h-[480px] overflow-hidden">
        <img src={festival.url} alt="Festival presentation at Vues d'Afrique, Montréal" width={1920} height={1088} className="absolute inset-0 h-full w-full object-cover opacity-60" />
        <div className="absolute inset-0 bg-[image:var(--gradient-veil)]" />
        <div className="relative mx-auto flex h-full max-w-7xl flex-col justify-end px-6 pb-16 md:px-12">
          <p className="eyebrow text-primary">About us</p>
          <h1 className="mt-4 max-w-4xl font-display text-5xl leading-tight text-foreground md:text-7xl">Cinema made between worlds.</h1>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-28 md:px-12">
        <p className="font-display text-2xl leading-relaxed text-foreground md:text-3xl">
          Les Productions du Mai Mars is an independent production company based in Montréal, dedicated to auteur cinema with African and diasporic roots.
        </p>
        <p className="mt-8 text-lg leading-relaxed text-muted-foreground">
          We build international co-productions that connect Canada, the Global South and the African continent — pairing bold directorial voices with the financing, structure and festival reach their films deserve.
        </p>
      </section>

      <section className="mx-auto grid max-w-7xl gap-px border-y border-border bg-border md:grid-cols-3">
        {pillars.map((p) => (
          <div key={p.t} className="bg-background px-8 py-14">
            <p className="font-display text-3xl text-primary">{p.t}</p>
            <p className="mt-4 text-muted-foreground">{p.d}</p>
          </div>
        ))}
      </section>

      <section className="mx-auto max-w-7xl px-6 py-28 md:px-12">
        <p className="eyebrow text-primary">On the festival circuit</p>
        <div className="mt-12 grid items-center gap-12 md:grid-cols-2">
          <img src={festivalTeam.url} alt="The team at a festival screening" width={1920} height={1088} className="w-full object-cover" />
          <p className="font-display text-2xl leading-relaxed text-foreground md:text-3xl">
            Our films travel — from Montréal screens to festivals across Africa, Europe and the Americas.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-28 md:px-12">
        <p className="eyebrow text-primary">The producers</p>
        <div className="mt-12 grid gap-16 md:grid-cols-2">
          {producers.map((p, i) => (
            <div key={i}>
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
