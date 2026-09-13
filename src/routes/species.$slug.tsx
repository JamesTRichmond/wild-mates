import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { FieldQuiz } from "@/components/field-quiz";
import { SaveButton } from "@/components/save-button";
import { Badge } from "@/components/ui/badge";
import { WildlifePlate } from "@/components/wildlife-plate";
import { ZoologistSheet } from "@/components/zoologist-sheet";
import { RitualPlayer } from "@/components/ritual-player";
import { CatalogMiss } from "@/components/catalog-miss";
import { hasSpeciesPortrait } from "@/lib/catalog/media";
import { hasReadyReel, playForSpecies } from "@/lib/catalog/plays";
import { speciesBySlug } from "@/lib/catalog/species";
import { strategyBySlug } from "@/lib/catalog/strategies";
import { speciesQuestion } from "@/lib/quiz";

export const Route = createFileRoute("/species/$slug")({
  component: SpeciesDetail,
  loader: ({ params }) => {
    const species = speciesBySlug[params.slug];
    if (!species) throw notFound();
    return species;
  },
  notFoundComponent: () => (
    <CatalogMiss
      title="No plate for that name"
      detail="That species is not in the 54-plate catalog. Identify from what you saw, or open Discover."
    />
  ),
});

function SpeciesDetail() {
  const species = Route.useLoaderData();
  const strategy = strategyBySlug[species.strategy];
  const quiz = speciesQuestion(species);
  const play = playForSpecies(species.slug);

  return (
    <article>
      <div className="grid gap-6 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <div>
          <WildlifePlate
            species={species}
            priority
            className="aspect-[4/5] w-full rounded-[28px]"
          />
          <p className="mt-2 text-xs text-subtle">
            {hasSpeciesPortrait(species.slug)
              ? "Illustrated field plate — not a field photograph."
              : "Strategy habitat plate with a specimen mark."}
          </p>
        </div>
        <div>
          <Badge>{strategy.name}</Badge>
          <h1 className="mt-3 font-display text-4xl leading-[0.95] text-fg">{species.name}</h1>
          <p className="mt-1 text-sm italic text-muted">{species.latin}</p>
          <p className="mt-4 text-base leading-relaxed text-fg">{species.tagline}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            <SaveButton slug={species.slug} />
            <Link
              to="/strategies/$slug"
              params={{ slug: strategy.slug }}
              className="inline-flex h-11 items-center rounded-[10px] px-4 text-sm text-fg shadow-[0_0_0_1px_var(--color-border)]"
            >
              Strategy: {strategy.name}
            </Link>
            <Link
              to="/compare"
              search={{ a: species.slug }}
              className="inline-flex h-11 items-center rounded-[10px] px-4 text-sm text-muted shadow-[0_0_0_1px_var(--color-border)]"
            >
              Compare
            </Link>
          </div>
          <dl className="mt-8 grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
            <div>
              <dt className="text-[11px] uppercase tracking-[0.14em] text-muted">Habitat</dt>
              <dd className="mt-1 text-fg">{species.habitat}</dd>
            </div>
            <div>
              <dt className="text-[11px] uppercase tracking-[0.14em] text-muted">Range</dt>
              <dd className="mt-1 text-fg">{species.region}</dd>
            </div>
            <div>
              <dt className="text-[11px] uppercase tracking-[0.14em] text-muted">Diet</dt>
              <dd className="mt-1 text-fg">{species.diet}</dd>
            </div>
            <div>
              <dt className="text-[11px] uppercase tracking-[0.14em] text-muted">Lifespan</dt>
              <dd className="mt-1 text-fg">{species.lifespan}</dd>
            </div>
            <div>
              <dt className="text-[11px] uppercase tracking-[0.14em] text-muted">Status</dt>
              <dd className="mt-1 text-fg">{species.status}</dd>
            </div>
          </dl>
        </div>
      </div>

      {hasReadyReel(play) && play ? (
        <div className="mt-8">
          <RitualPlayer play={play} />
        </div>
      ) : null}

      <section className="mt-10 max-w-prose space-y-4 text-sm leading-relaxed text-muted">
        <h2 className="font-display text-2xl text-fg">Field notes</h2>
        <p>{species.summary}</p>
        <h2 className="font-display text-2xl text-fg">How reproduction is organized</h2>
        <p>{species.ritual}</p>
      </section>

      <div className="mt-10">
        <FieldQuiz item={quiz} title="Check the plate" />
      </div>

      <div className="mt-10">
        <ZoologistSheet species={species} />
      </div>
    </article>
  );
}
