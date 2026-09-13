import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { FieldQuiz } from "@/components/field-quiz";
import { SpeciesCard } from "@/components/species-card";
import { StrategyPlate } from "@/components/wildlife-plate";
import { RitualPlayer } from "@/components/ritual-player";
import { CatalogMiss } from "@/components/catalog-miss";
import { flagshipForStrategy } from "@/lib/catalog/plays";
import { speciesForStrategy } from "@/lib/catalog/species";
import { STRATEGY_SLUGS, strategyBySlug, type StrategySlug } from "@/lib/catalog/strategies";
import { strategyQuestion } from "@/lib/quiz";

export const Route = createFileRoute("/strategies/$slug")({
  component: StrategyDetail,
  loader: ({ params }) => {
    if (!STRATEGY_SLUGS.includes(params.slug as StrategySlug)) throw notFound();
    return strategyBySlug[params.slug as StrategySlug];
  },
  notFoundComponent: () => (
    <CatalogMiss
      title="That strategy is not in this catalog"
      detail="Nine systems only: lekking through sequential hermaphroditism. Open the list, or Identify from a body plan."
    />
  ),
});

function StrategyDetail() {
  const strategy = Route.useLoaderData();
  const plates = speciesForStrategy(strategy.slug);
  const quiz = strategyQuestion(strategy);
  const flagship = flagshipForStrategy(strategy.slug);

  return (
    <article>
      <Link to="/strategies" className="text-sm text-accent">
        All strategies
      </Link>
      <StrategyPlate
        slug={strategy.slug}
        label={strategy.name}
        className="mt-4 aspect-[16/9] w-full rounded-[28px]"
      />
      <p className="mt-4 text-[11px] uppercase tracking-[0.2em] text-muted">{strategy.latinHint}</p>
      <h1 className="mt-2 font-display text-4xl text-fg">{strategy.name}</h1>
      <p className="mt-2 font-display text-xl italic text-accent">{strategy.tagline}</p>
      <div className="mt-6 max-w-prose space-y-4 text-sm leading-relaxed text-muted">
        <p>{strategy.summary}</p>
        <p>{strategy.howItWorks}</p>
        <p>{strategy.ecologicalNote}</p>
      </div>
      {flagship ? (
        <div className="mt-10">
          <p className="mb-3 text-[11px] uppercase tracking-[0.16em] text-muted">Flagship reel</p>
          <RitualPlayer play={flagship} />
        </div>
      ) : null}
      <div className="mt-10">
        <FieldQuiz item={quiz} title="Check the system" />
      </div>
      <h2 className="mt-10 font-display text-2xl text-fg">Species on this plate</h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {plates.map((sp) => (
          <SpeciesCard key={sp.slug} species={sp} />
        ))}
      </div>
    </article>
  );
}
