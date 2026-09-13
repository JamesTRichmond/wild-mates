import { Link } from "@tanstack/react-router";
import { Badge } from "@/components/ui/badge";
import { WildlifePlate } from "@/components/wildlife-plate";
import { type Species } from "@/lib/catalog/species";
import { strategyBySlug } from "@/lib/catalog/strategies";

export function SpeciesCard({ species }: { species: Species }) {
  const strategy = strategyBySlug[species.strategy];
  return (
    <Link
      to="/species/$slug"
      params={{ slug: species.slug }}
      className="group block rounded-[28px] bg-surface p-2 shadow-[0_0_0_1px_var(--color-border)] transition-[box-shadow,transform] duration-250 ease-out hover:shadow-[0_0_0_1px_rgb(238_230_214/0.22)]"
    >
      <WildlifePlate
        species={species}
        className="aspect-[4/5] w-full rounded-2xl"
      />
      <div className="px-3 pb-3 pt-3">
        <Badge>{strategy.name}</Badge>
        <h3 className="mt-2 font-display text-2xl leading-tight text-fg">{species.name}</h3>
        <p className="mt-0.5 text-xs italic text-muted">{species.latin}</p>
        <p className="mt-2 text-sm leading-snug text-muted">{species.tagline}</p>
      </div>
    </Link>
  );
}
