import { createFileRoute, Link } from "@tanstack/react-router";
import { SpeciesCard } from "@/components/species-card";
import { speciesBySlug } from "@/lib/catalog/species";
import { useFieldLog } from "@/lib/field-log";
import { useSavedSlugs } from "@/lib/saved";

export const Route = createFileRoute("/saved")({ component: Saved });

function Saved() {
  const slugs = useSavedSlugs();
  const plates = slugs.map((s) => speciesBySlug[s]).filter(Boolean);
  const log = useFieldLog();
  const answered = Object.keys(log.answered).length;

  return (
    <main>
      <p className="text-[11px] uppercase tracking-[0.2em] text-muted">On this device</p>
      <h1 className="mt-2 font-display text-4xl text-fg">Saved</h1>
      <p className="mt-3 max-w-prose text-sm text-muted">
        No account. Clearing this browser’s storage clears the shelf and the field log.
      </p>
      <dl className="mt-6 grid grid-cols-2 gap-3 text-sm">
        <div className="rounded-2xl bg-surface px-4 py-4 shadow-[0_0_0_1px_var(--color-border)]">
          <dt className="text-[11px] uppercase tracking-[0.14em] text-muted">Daily streak</dt>
          <dd className="mt-1 font-display text-3xl tabular-nums text-fg">{log.streak}</dd>
        </div>
        <div className="rounded-2xl bg-surface px-4 py-4 shadow-[0_0_0_1px_var(--color-border)]">
          <dt className="text-[11px] uppercase tracking-[0.14em] text-muted">Plates checked</dt>
          <dd className="mt-1 font-display text-3xl tabular-nums text-fg">{answered}</dd>
        </div>
      </dl>
      {plates.length === 0 ? (
        <p className="mt-8 text-sm text-muted">
          Nothing pinned yet. Open a species from{" "}
          <Link to="/" className="text-accent">
            Discover
          </Link>{" "}
          and save the plate.
        </p>
      ) : (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {plates.map((sp) => (
            <SpeciesCard key={sp.slug} species={sp} />
          ))}
        </div>
      )}
    </main>
  );
}
