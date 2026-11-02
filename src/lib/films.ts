const muntu = { url: "/images/behind-the-scenes.jpg" };
const inkoni = { url: "/images/inkoni-still.jpg" };
const reve = { url: "/images/scene-de-reve-poster.webp" };

export type Film = {
  slug: string;
  title: string;
  status: string;
  format: string;
  logline: string;
  image: string;
  poster?: boolean; // portrait poster with text: shown whole, never cropped full-bleed
  vimeoId?: string; // add a Vimeo ID to embed the trailer
};

export const films: Film[] = [
  {
    slug: "muntu",
    title: "Muntu",
    status: "Development",
    format: "Feature · Drama",
    logline:
      "Spanning three generations of a Rwandan family, a beaten child, a disillusioned mother, and an abandoned father navigate cycles of trauma.",
    image: muntu.url,
  },
  {
    slug: "inkoni",
    title: "Inkoni",
    status: "Post-Production",
    format: "Feature · Drama",
    logline:
      "A boy escapes into a dreamscape shaped by his own chalk drawings.",
    image: inkoni.url,
  },
  {
    slug: "scene-de-reve",
    title: "Scène de Rêve",
    status: "40th Vues d'Afrique",
    format: "Documentary · 24 min",
    logline:
      "The Afro-diasporic group Zunza chases its dream of the big stage at a prestigious Toronto festival, through the setbacks and small victories of emerging artists.",
    image: reve.url,
    poster: true,
  },
];
