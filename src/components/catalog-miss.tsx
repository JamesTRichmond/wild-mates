import { Link } from "@tanstack/react-router";

export function CatalogMiss({
  title = "That plate is not in this guide",
  detail = "The catalog is 54 species and nine strategies. A mistyped name lands here.",
}: {
  title?: string;
  detail?: string;
}) {
  return (
    <main className="mx-auto max-w-lg py-10 text-center">
      <p className="text-[11px] uppercase tracking-[0.2em] text-muted">Missing plate</p>
      <h1 className="mt-3 font-display text-4xl text-fg">{title}</h1>
      <p className="mt-3 text-sm leading-relaxed text-muted">{detail}</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          to="/"
          className="inline-flex h-11 items-center rounded-[10px] bg-accent px-4 text-sm text-accent-fg"
        >
          Discover
        </Link>
        <Link
          to="/identify"
          className="inline-flex h-11 items-center rounded-[10px] px-4 text-sm text-fg shadow-[0_0_0_1px_var(--color-border)]"
        >
          Identify
        </Link>
        <Link
          to="/strategies"
          className="inline-flex h-11 items-center rounded-[10px] px-4 text-sm text-fg shadow-[0_0_0_1px_var(--color-border)]"
        >
          Nine strategies
        </Link>
      </div>
    </main>
  );
}

export function DefaultNotFound() {
  return <CatalogMiss />;
}
