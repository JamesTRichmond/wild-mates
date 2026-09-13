import { SpecimenPlate } from "@/components/specimen-plate";
import { hasSpeciesPortrait, speciesPhoto, strategyPhoto } from "@/lib/catalog/media";
import { type Species } from "@/lib/catalog/species";
import { type StrategySlug } from "@/lib/catalog/strategies";
import { cn } from "@/lib/utils";

export function WildlifePlate({
  species,
  className,
  priority = false,
}: {
  species: Species;
  className?: string;
  priority?: boolean;
}) {
  const src = speciesPhoto(species.slug, species.strategy);
  return (
    <div
      className={cn(
        "relative overflow-hidden bg-elevated outline outline-1 -outline-offset-1 outline-white/10",
        className,
      )}
    >
      <img
        src={src}
        alt={species.name}
        className="h-full w-full object-cover"
        crossOrigin="anonymous"
        loading={priority ? "eager" : "lazy"}
      />
      <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg/70 via-transparent to-bg/10" />
      {!hasSpeciesPortrait(species.slug) ? (
        <SpecimenPlate
          seed={species.slug}
          className="pointer-events-none absolute inset-0 opacity-25 mix-blend-screen"
        />
      ) : null}
    </div>
  );
}

export function StrategyPlate({
  slug,
  label,
  className,
}: {
  slug: StrategySlug;
  label: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden bg-elevated outline outline-1 -outline-offset-1 outline-white/10",
        className,
      )}
    >
      <img
        src={strategyPhoto(slug)}
        alt={label}
        className="h-full w-full object-cover"
        crossOrigin="anonymous"
        loading="lazy"
      />
      <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg/75 via-transparent to-transparent" />
    </div>
  );
}
