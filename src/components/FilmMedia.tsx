import { useEffect, useRef, useState } from "react";
import { Play } from "lucide-react";
import type { Film } from "@/lib/films";
import { useT } from "@/lib/i18n";

// Wait briefly before loading the hover preview so passing the cursor over a cover
// doesn't start a video.
const PREVIEW_DELAY_MS = 600;

function vimeoSrc(film: Film, params: Record<string, string>) {
  const query = new URLSearchParams({
    ...(film.vimeoHash ? { h: film.vimeoHash } : {}),
    title: "0",
    byline: "0",
    portrait: "0",
    ...params,
  });
  return `https://player.vimeo.com/video/${film.vimeoId}?${query}`;
}

// Cover image for a film. With a trailer, hovering plays a muted preview behind a
// "Watch the trailer" button (Netflix-style); clicking plays it with sound and controls.
export function FilmMedia({ film }: { film: Film }) {
  const t = useT().slate;
  const [previewing, setPreviewing] = useState(false);
  const [playing, setPlaying] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  const cover = (
    <img
      src={film.image}
      alt={film.title}
      loading="lazy"
      width={1920}
      height={1088}
      className={`absolute inset-0 h-full w-full transition-transform duration-700 ${film.poster ? "object-contain" : "object-cover"} ${previewing ? "scale-[1.02]" : ""}`}
    />
  );

  if (!film.vimeoId) {
    return (
      <div className="relative aspect-video overflow-hidden bg-card">
        {cover}
        <div className="absolute inset-0 flex items-end bg-gradient-to-t from-background/80 to-transparent p-6">
          <span className="eyebrow text-primary">{t.trailerSoon}</span>
        </div>
      </div>
    );
  }

  if (playing) {
    return (
      <div className="relative aspect-video overflow-hidden bg-black">
        <iframe
          src={vimeoSrc(film, { autoplay: "1" })}
          className="absolute inset-0 h-full w-full"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          title={t.trailerTitle(film.title)}
        />
      </div>
    );
  }

  return (
    <div
      className="group relative aspect-video cursor-pointer overflow-hidden bg-card"
      onMouseEnter={() => {
        timer.current = setTimeout(() => setPreviewing(true), PREVIEW_DELAY_MS);
      }}
      onMouseLeave={() => {
        clearTimeout(timer.current);
        setPreviewing(false);
      }}
      onClick={() => setPlaying(true)}
    >
      {cover}
      {previewing && (
        <iframe
          src={vimeoSrc(film, { background: "1", muted: "1", autoplay: "1", loop: "1" })}
          className="pointer-events-none absolute inset-0 h-full w-full animate-in fade-in duration-1000"
          allow="autoplay"
          tabIndex={-1}
          aria-hidden
          title={t.trailerTitle(film.title)}
        />
      )}
      <div className="absolute inset-0 flex items-end bg-gradient-to-t from-background/90 via-background/10 to-transparent p-6 md:p-8">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setPlaying(true);
          }}
          className="eyebrow flex items-center gap-3 border border-primary bg-background/60 px-5 py-3 text-primary backdrop-blur-sm transition-colors hover:bg-primary hover:text-primary-foreground group-hover:bg-primary group-hover:text-primary-foreground"
        >
          <Play className="h-4 w-4 fill-current" aria-hidden />
          {t.watchTrailer}
        </button>
      </div>
    </div>
  );
}
