import type { ErrorComponentProps } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { TriangleAlert } from "lucide-react";

const FALLBACK_MESSAGE = "Something on this plate failed. Try Discover, or reload.";

function errorMessage(error: unknown): string {
  if (error instanceof Error && error.message) return error.message;
  if (typeof error === "string" && error) return error;
  return FALLBACK_MESSAGE;
}

export function AppErrorComponent({ error }: ErrorComponentProps) {
  return (
    <main className="flex min-h-[50vh] flex-col items-center justify-center gap-3 px-6 text-center">
      <span className="text-accent" aria-hidden="true">
        <TriangleAlert className="size-10" strokeWidth={1.6} />
      </span>
      <h1 className="font-display text-2xl text-fg">This plate broke</h1>
      <p className="max-w-md text-sm break-words text-muted">{errorMessage(error)}</p>
      <div className="mt-4 flex flex-wrap justify-center gap-3">
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
      </div>
    </main>
  );
}
