import type { Config, Context } from "@netlify/edge-functions";

// Sends visitors to the French site (/fr/...) when they've chosen French with the
// language toggle, or when they haven't chosen yet and their browser prefers French.
export default async (req: Request, context: Context) => {
  if (req.method !== "GET") return;

  const chosen = context.cookies.get("lang");
  const lang =
    chosen === "en" || chosen === "fr" ? chosen : preferredLang(req.headers.get("accept-language"));
  if (lang !== "fr") return;

  const url = new URL(req.url);
  url.pathname = url.pathname === "/" ? "/fr" : `/fr${url.pathname}`;
  return new Response(null, {
    status: 302,
    headers: {
      location: url.toString(),
      vary: "Accept-Language, Cookie",
      "cache-control": "private, no-store",
    },
  });
};

// Picks whichever of English or French ranks higher in Accept-Language.
function preferredLang(header: string | null): "en" | "fr" | undefined {
  let best: { lang: "en" | "fr"; q: number } | undefined;
  for (const part of (header ?? "").split(",")) {
    const [tag = "", ...attrs] = part.trim().toLowerCase().split(";");
    const lang = tag.split("-")[0];
    if (lang !== "en" && lang !== "fr") continue;
    const qAttr = attrs.find((a) => a.trim().startsWith("q="));
    const q = qAttr ? Number(qAttr.trim().slice(2)) : 1;
    if (!best || q > best.q) best = { lang, q };
  }
  return best?.lang;
}

// English pages only; keep in sync with src/routes/{-$locale}/.
export const config: Config = {
  path: ["/", "/slate", "/about"],
};
