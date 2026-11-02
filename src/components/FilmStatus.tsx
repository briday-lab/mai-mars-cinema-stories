import type { Film } from "@/lib/films";

// A film's status line, with the festival's logo beside it when there is one.
export function FilmStatus({
  film,
  prefix = "",
  className = "",
}: {
  film: Film;
  prefix?: string;
  className?: string;
}) {
  return (
    <p className={`flex items-center gap-3 ${className}`}>
      <span>
        {prefix}
        {film.status}
      </span>
      {film.festivalLogo && (
        <img
          src={film.festivalLogo.src}
          alt={film.festivalLogo.alt}
          width={250}
          height={75}
          className="h-4 w-auto opacity-80 md:h-5"
        />
      )}
    </p>
  );
}
