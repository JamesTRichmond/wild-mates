import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { WildlifePlate } from "@/components/wildlife-plate";
import { SPECIES, speciesBySlug, type Species } from "@/lib/catalog/species";
import { strategyBySlug } from "@/lib/catalog/strategies";

type Search = { a?: string; b?: string };

export const Route = createFileRoute("/compare")({
  validateSearch: (raw: Record<string, unknown>): Search => ({
    a: typeof raw.a === "string" ? raw.a : undefined,
    b: typeof raw.b === "string" ? raw.b : undefined,
  }),
  component: Compare,
});

function Compare() {
  const { a, b } = Route.useSearch();
  const left = a ? speciesBySlug[a] : undefined;
  const right = b ? speciesBySlug[b] : undefined;

  return (
    <main>
      <p className="text-[11px] uppercase tracking-[0.2em] text-muted">Side by side</p>
      <h1 className="mt-2 font-display text-4xl text-fg">Compare</h1>
      <p className="mt-3 max-w-prose text-sm text-muted">
        Two plates, two strategies. Choose from the catalog — nothing is ranked as better.
      </p>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <Picker name="a" value={a} other={b} />
        <Picker name="b" value={b} other={a} />
      </div>
      {left && right ? (
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <Plate species={left} />
          <Plate species={right} />
        </div>
      ) : (
        <p className="mt-8 text-sm text-muted">Pick two species to see the notes together.</p>
      )}
    </main>
  );
}

function Picker({
  name,
  value,
  other,
}: {
  name: "a" | "b";
  value?: string;
  other?: string;
}) {
  const navigate = useNavigate({ from: "/compare" });
  return (
    <label className="block text-sm">
      <span className="text-[11px] uppercase tracking-[0.14em] text-muted">
        {name === "a" ? "First plate" : "Second plate"}
      </span>
      <select
        className="mt-2 h-11 w-full rounded-[10px] bg-elevated px-3 text-fg shadow-[0_0_0_1px_var(--color-border)] outline-none"
        value={value ?? ""}
        onChange={(e) => {
          const next = e.target.value || undefined;
          const search =
            name === "a" ? { a: next, b: other } : { a: other, b: next };
          void navigate({ search });
        }}
      >
        <option value="">Choose…</option>
        {SPECIES.map((s) => (
          <option key={s.slug} value={s.slug} disabled={s.slug === other}>
            {s.name}
          </option>
        ))}
      </select>
    </label>
  );
}

function Plate({ species }: { species: Species }) {
  const strategy = strategyBySlug[species.strategy];
  return (
    <section className="rounded-[28px] bg-surface p-4 shadow-[0_0_0_1px_var(--color-border)]">
      <WildlifePlate species={species} className="aspect-[4/5] rounded-2xl" />
      <h2 className="mt-4 font-display text-2xl text-fg">{species.name}</h2>
      <p className="text-xs italic text-muted">{species.latin}</p>
      <p className="mt-2 text-sm text-accent">{strategy.name}</p>
      <p className="mt-3 text-sm leading-relaxed text-muted">{species.summary}</p>
      <Link
        to="/species/$slug"
        params={{ slug: species.slug }}
        className="mt-4 inline-flex h-11 items-center text-sm text-accent"
      >
        Open plate
      </Link>
    </section>
  );
}
