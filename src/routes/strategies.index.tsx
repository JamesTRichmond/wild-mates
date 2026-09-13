import { createFileRoute, Link } from "@tanstack/react-router";
import { StrategyPlate } from "@/components/wildlife-plate";
import { speciesForStrategy } from "@/lib/catalog/species";
import { STRATEGIES } from "@/lib/catalog/strategies";

export const Route = createFileRoute("/strategies/")({ component: StrategiesIndex });

function StrategiesIndex() {
  return (
    <main>
      <p className="text-[11px] uppercase tracking-[0.2em] text-muted">
        A field guide to reproductive strategies
      </p>
      <h1 className="mt-2 font-display text-4xl text-fg">Nine strategies</h1>
      <p className="mt-3 max-w-prose text-sm leading-relaxed text-muted">
        Behavioral ecology, not dating advice. Each card is a reproductive system that evolved under
        particular costs: care, competition, or the absence of a partner.
      </p>
      <p className="mt-3 text-sm">
        <Link to="/compare" className="text-accent">
          Compare two plates
        </Link>
      </p>
      <ul className="mt-8 space-y-3">
        {STRATEGIES.map((s) => {
          const count = speciesForStrategy(s.slug).length;
          return (
            <li key={s.slug}>
              <Link
                to="/strategies/$slug"
                params={{ slug: s.slug }}
                className="block overflow-hidden rounded-[24px] bg-surface shadow-[0_0_0_1px_var(--color-border)]"
              >
                <StrategyPlate slug={s.slug} label={s.name} className="aspect-[16/9] w-full" />
                <div className="px-5 py-5">
                  <div className="flex items-baseline justify-between gap-3">
                    <h2 className="font-display text-2xl text-fg">{s.name}</h2>
                    <span className="text-xs tabular-nums text-muted">{count} plates</span>
                  </div>
                  <p className="mt-1 text-sm text-accent">{s.tagline}</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{s.summary}</p>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
