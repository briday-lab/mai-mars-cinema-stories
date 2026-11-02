import { useLang, type Lang } from "@/lib/i18n";

const muntu = { url: "/images/behind-the-scenes.jpg" };
const inkoni = { url: "/images/inkoni-still.jpg" };
const reve = { url: "/images/scene-de-reve-poster.webp" };

type Localized = { status: string; format: string; logline: string };

export type Film = Localized & {
  slug: string;
  title: string;
  image: string;
  poster?: boolean; // portrait poster with text: shown whole, never cropped full-bleed
  festivalLogo?: { src: string; alt: string }; // small logo shown next to the status
  vimeoId?: string; // add a Vimeo ID to embed the trailer
  vimeoHash?: string; // privacy code from unlisted links (vimeo.com/<id>/<hash>)
};

const filmData: (Omit<Film, keyof Localized> & Record<Lang, Localized>)[] = [
  {
    slug: "muntu",
    title: "Muntu",
    en: {
      status: "Development",
      format: "Feature · Drama",
      logline:
        "Spanning three generations of a Rwandan family, a beaten child, a disillusioned mother, and an abandoned father navigate cycles of trauma.",
    },
    fr: {
      status: "Développement",
      format: "Long métrage · Drame",
      logline:
        "Sur trois générations d'une famille rwandaise, un enfant battu, une mère désabusée et un père abandonné traversent des cycles de traumatismes.",
    },
    image: muntu.url,
  },
  {
    slug: "inkoni",
    title: "Inkoni",
    en: {
      status: "Post-Production",
      format: "Short · Drama",
      logline: "A boy escapes into a dreamscape shaped by his own chalk drawings.",
    },
    fr: {
      status: "Postproduction",
      format: "Court métrage · Drame",
      logline:
        "Un garçon s'évade dans un monde onirique façonné par ses propres dessins à la craie.",
    },
    image: inkoni.url,
  },
  {
    slug: "scene-de-reve",
    title: "Scène de Rêve",
    en: {
      status: "41st Vues d'Afrique",
      format: "Documentary · 24 min",
      logline:
        "The Afro-diasporic group Zunza chases its dream of the big stage at a prestigious Toronto festival, through the setbacks and small victories of emerging artists.",
    },
    fr: {
      status: "41e Vues d'Afrique",
      format: "Documentaire · 24 min",
      logline:
        "Le groupe afrodiasporique Zunza poursuit son rêve de grande scène dans un prestigieux festival torontois, entre revers et petites victoires d'artistes émergents.",
    },
    image: reve.url,
    poster: true,
    festivalLogo: { src: "/images/vues-dafrique-logo.png", alt: "Vues d'Afrique" },
    vimeoId: "1041135693",
    vimeoHash: "afb21c8f99",
  },
];

export function getFilms(lang: Lang): Film[] {
  return filmData.map(({ en, fr, ...rest }) => ({ ...rest, ...(lang === "fr" ? fr : en) }));
}

export function useFilms(): Film[] {
  return getFilms(useLang());
}
