"use client";

import { useEffect, useMemo, useState } from "react";
import { HUMAN_ITEMS } from "@/lib/ledger";

const STORAGE = "wild-mates-clicklist-v1";

function loadDone(): Record<number, boolean> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(STORAGE);
    return raw ? (JSON.parse(raw) as Record<number, boolean>) : {};
  } catch {
    return {};
  }
}

export function Clicklist() {
  const [done, setDone] = useState<Record<number, boolean>>({});
  const [open, setOpen] = useState<Record<number, boolean>>({});

  useEffect(() => {
    setDone(loadDone());
  }, []);

  function toggle(id: number) {
    setDone((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      localStorage.setItem(STORAGE, JSON.stringify(next));
      return next;
    });
  }

  const total = HUMAN_ITEMS.length;
  const n = HUMAN_ITEMS.filter((s) => done[s.clickId]).length;
  const nextOpen = HUMAN_ITEMS.find((s) => {
    if (done[s.clickId]) return false;
    if (s.blockedBy == null) return true;
    return Boolean(done[s.blockedBy]);
  });

  const groups = useMemo(
    () => [
      { name: "Now", ids: [1, 2, 4, 6] },
      { name: "After the hallway", ids: [3] },
      { name: "After the repo call", ids: [5] },
    ],
    [],
  );

  return (
    <div className="flex flex-col gap-8">
      <div>
        <div className="mb-2 flex items-baseline justify-between text-[11px] uppercase tracking-[0.18em] text-muted">
          <span>
            {n} / {total}
          </span>
          <span>{nextOpen ? `Next: ${nextOpen.clickId}. ${nextOpen.title}` : "Nothing open"}</span>
        </div>
        <div className="h-1 overflow-hidden rounded-full bg-elevated">
          <div
            className="h-full bg-accent transition-[width]"
            style={{ width: `${(n / total) * 100}%` }}
          />
        </div>
      </div>

      {groups.map((g) => (
        <section key={g.name} className="flex flex-col gap-2">
          <h2 className="text-[11px] uppercase tracking-[0.18em] text-accent">{g.name}</h2>
          {HUMAN_ITEMS.filter((s) => g.ids.includes(s.clickId)).map((s) => {
            const blocked = s.blockedBy != null && !done[s.blockedBy];
            const isDone = Boolean(done[s.clickId]);
            return (
              <article
                key={s.clickId}
                className="rounded-2xl bg-surface px-4 py-3 shadow-[0_0_0_1px_var(--color-border)]"
              >
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    checked={isDone}
                    disabled={blocked}
                    onChange={() => toggle(s.clickId)}
                    className="mt-1 size-4 accent-[#d4c4a8]"
                    aria-label={`${s.clickId}. ${s.title}`}
                  />
                  <div className="min-w-0 flex-1">
                    <p className={`text-sm text-fg ${isDone ? "line-through opacity-50" : ""}`}>
                      <span className="text-muted">{s.clickId}.</span> {s.title}
                      <span className="ml-2 text-xs text-muted">{s.time}</span>
                    </p>
                    {blocked ? (
                      <p className="mt-1 text-xs text-muted">Wait on {s.blockedBy}.</p>
                    ) : null}
                    <button
                      type="button"
                      className="mt-2 text-[11px] uppercase tracking-[0.18em] text-muted hover:text-fg"
                      onClick={() => setOpen((o) => ({ ...o, [s.clickId]: !o[s.clickId] }))}
                    >
                      {open[s.clickId] ? "Hide how" : "How"}
                    </button>
                    {open[s.clickId] ? (
                      <div className="mt-2 space-y-2 text-sm text-muted">
                        <p>{s.how}</p>
                        {s.href ? (
                          <p>
                            <a
                              href={s.href}
                              className="text-accent underline decoration-accent/40 underline-offset-4"
                            >
                              Open
                            </a>
                          </p>
                        ) : null}
                        <p className="text-xs text-subtle">Success: {s.success}</p>
                      </div>
                    ) : null}
                  </div>
                </div>
              </article>
            );
          })}
        </section>
      ))}
    </div>
  );
}
