import type { ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Bookmark, Compass, Layers, ScanSearch } from "lucide-react";
import { cn } from "@/lib/utils";

const TABS = [
  { to: "/", label: "Discover", icon: Compass, match: (p: string) => p === "/" },
  {
    to: "/identify",
    label: "Identify",
    icon: ScanSearch,
    match: (p: string) => p.startsWith("/identify"),
  },
  {
    to: "/strategies",
    label: "Strategies",
    icon: Layers,
    match: (p: string) => p.startsWith("/strategies"),
  },
  {
    to: "/saved",
    label: "Saved",
    icon: Bookmark,
    match: (p: string) => p.startsWith("/saved"),
  },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const onShow = pathname === "/" || /^\/species\/[^/]+$/.test(pathname);
  const subline = onShow
    ? "A satirical science show in clay"
    : "A field guide to reproductive strategies";

  return (
    <div className="min-h-dvh bg-bg text-fg">
      <header
        data-testid="site-chrome-header"
        className="sticky top-0 z-30 border-b border-border bg-bg/80 px-4 py-3 backdrop-blur-md"
      >
        <div className="mx-auto flex max-w-5xl items-baseline justify-between gap-4">
          <Link to="/" className="font-display text-2xl tracking-tight text-fg">
            Wild Mates
          </Link>
          <p className="hidden text-[11px] uppercase tracking-[0.18em] text-muted sm:block">
            {subline}
          </p>
        </div>
      </header>
      <div className="mx-auto max-w-5xl px-4 pb-28 pt-6">{children}</div>
      <nav
        data-testid="site-chrome-nav"
        aria-label="Primary"
        className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-bg/90 pb-[env(safe-area-inset-bottom)] backdrop-blur-md"
      >
        <ul className="mx-auto grid max-w-5xl grid-cols-4">
          {TABS.map((tab) => {
            const active = tab.match(pathname);
            const Icon = tab.icon;
            return (
              <li key={tab.to}>
                <Link
                  to={tab.to}
                  className={cn(
                    "flex min-h-14 flex-col items-center justify-center gap-1 text-[11px] uppercase tracking-[0.12em]",
                    active ? "text-accent" : "text-muted",
                  )}
                  aria-current={active ? "page" : undefined}
                >
                  <Icon className="size-5" strokeWidth={1.6} />
                  {tab.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
