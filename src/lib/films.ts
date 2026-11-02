const muntu = { url: "/images/behind-the-scenes.jpg" };
const inkoni = { url: "/images/inkoni-still.jpg" };
const reve = { url: "/images/scene-de-reve-poster.webp" };

export type Film = {
  slug: string;
  title: string;
  status: string;
  format: string;
  countries: string;
  logline: string;
  image: string;
  vimeoId?: string; // add a Vimeo ID to embed the trailer
};

export const films: Film[] = [
  {
    slug: "muntu",
    title: "Muntu",
    status: "In Development",
    format: "Feature · Drama",
    countries: "Canada · Rwanda",
    logline:
      "Spanning three generations of a Rwandan family, a beaten child, a disillusioned mother, and an abandoned father navigate cycles of trauma.",
    image: muntu.url,
  },
  {
    slug: "inkoni",
    title: "Inkoni",
    status: "Post-Production",
    format: "Feature · Drama",
    countries: "Canada · South Africa",
    logline:
      "A boy escapes into a dreamscape shaped by his own chalk drawings.",
    image: inkoni.url,
  },
  {
    slug: "scene-de-reve",
    title: "Scène de Rêve",
    status: "Completed",
    format: "Documentary · 24 min",
    countries: "Canada",
    logline:
      "The Afro-diasporic group Zunza chases its dream of the big stage at a prestigious Toronto festival, through the setbacks and small victories of emerging artists.",
    image: reve.url,
  },
];
