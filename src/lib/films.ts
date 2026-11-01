import muntu from "@/assets/behind-the-scenes.jpg.asset.json";
import inkoni from "@/assets/inkoni-still.jpg.asset.json";
import reve from "@/assets/scene-de-reve-poster.webp.asset.json";

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
    countries: "Canada · DR Congo",
    logline:
      "A herdsman returns to the land of his ancestors to bury his father, and finds the earth itself refusing to let him go.",
    image: muntu.url,
  },
  {
    slug: "inkoni",
    title: "Inkoni",
    status: "Post-Production",
    format: "Feature · Drama",
    countries: "Canada · South Africa",
    logline:
      "An elder's carved staff passes between three generations, carrying a promise none of them chose to keep.",
    image: inkoni.url,
  },
  {
    slug: "scene-de-reve",
    title: "Scène de Rêve",
    status: "Financing",
    format: "Feature · Musical Drama",
    countries: "Canada · Senegal · France",
    logline:
      "In an abandoned Montreal theatre, a young Senegalese performer rehearses for a show that may only exist in her dreams.",
    image: reve.url,
  },
];
