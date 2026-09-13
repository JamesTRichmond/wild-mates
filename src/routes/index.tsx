import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { FieldQuiz } from "@/components/field-quiz";
import { SpeciesCard } from "@/components/species-card";
import { Badge } from "@/components/ui/badge";
import { DiscoverClayLoop } from "@/components/ritual-player";
import { playForSpecies } from "@/lib/catalog/plays";
import { SPECIES, speciesOfTheDay } from "@/lib/catalog/species";
import { STRATEGIES, strategyBySlug } from "@/lib/catalog/strategies";
import { useFieldLog } from "@/lib/field-log";
import { dailyQuestion } from "@/lib/quiz";
import { StrategyPlate, WildlifePlate } from "@/components/wildlife-plate";

export const Route = createFileRoute("/")({ component: Discover });

function Discover() {
  const featured = speciesOfTheDay();
  const strategy = strategyBySlug[featured.strategy];
  const log = useFieldLog();
  const question = dailyQuestion(featured);
  const play = playForSpecies(featured.slug);

  return (
    <main>
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-[11px] uppercase tracking-[0.2em] text-muted">
            A satirical science show in clay
          </p>
          <p className="mt-1 text-xs text-subtle">One ritual per plate. Featured film, then the catalog.</p>
        </div>
        <p className="text-xs tabular-nums text-muted" data-testid="field-streak">
          Streak <span className="text-accent">{log.streak}</span>
        </p>
      </div>

      <div className="mt-4 grid overflow-hidden rounded-[28px] bg-surface shadow-[0_0_0_1px_var(--color-border)] md:grid-cols-[1.1fr_1fr]">
        {play ? (
          <DiscoverClayLoop play={play} />
        ) : (
          <WildlifePlate
            species={featured}
            priority
            className="min-h-56 w-full md:min-h-full"
          />
        )}
        <div className="flex flex-col justify-end p-6">
          <Badge>{strategy.name}</Badge>
          <h1 className="mt-3 font-display text-4xl leading-[0.95] text-fg md:text-5xl">
            {featured.name}
          </h1>
          <p className="mt-1 text-sm italic text-muted">{featured.latin}</p>
          <p className="mt-4 max-w-prose text-sm leading-relaxed text-muted">{featured.tagline}</p>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <Link
              to="/species/$slug"
              params={{ slug: featured.slug }}
              className="inline-flex h-11 items-center gap-2 text-sm text-accent"
            >
              Open the plate <ArrowRight className="size-4" />
            </Link>
            <Link to="/compare" search={{ a: featured.slug }} className="text-sm text-muted">
              Compare
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <FieldQuiz item={question} daily title="Question of the day" />
      </div>

      <section className="mt-10">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-display text-3xl text-fg">Nine strategies</h2>
          <Link to="/strategies" className="text-sm text-accent">
            All strategies
          </Link>
        </div>
        <ul className="mt-4 grid gap-2 sm:grid-cols-3">
          {STRATEGIES.map((s) => (
            <li key={s.slug}>
              <Link
                to="/strategies/$slug"
                params={{ slug: s.slug }}
                className="block overflow-hidden rounded-2xl bg-surface shadow-[0_0_0_1px_var(--color-border)] transition-[box-shadow] duration-200 hover:shadow-[0_0_0_1px_rgb(238_230_214/0.22)]"
              >
                <StrategyPlate slug={s.slug} label={s.name} className="aspect-[16/9] w-full" />
                <div className="px-4 py-3">
                  <p className="text-[11px] uppercase tracking-[0.14em] text-muted">
                    {s.latinHint}
                  </p>
                  <p className="mt-1 font-display text-xl text-fg">{s.name}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-3xl text-fg">Catalog</h2>
        <p className="mt-1 text-sm text-muted">{SPECIES.length} species, grouped as they live.</p>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SPECIES.map((sp) => (
            <SpeciesCard key={sp.slug} species={sp} />
          ))}
        </div>
      </section>
    </main>
  );
}
