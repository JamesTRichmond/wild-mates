import { useSyncExternalStore } from "react";
import { utcDateKey } from "./quiz";

export type FieldLog = {
  streak: number;
  lastDate: string | null;
  answered: Record<string, boolean>;
};

const KEY = "wild-mates:field-log";
const EMPTY: FieldLog = { streak: 0, lastDate: null, answered: {} };

function read(): FieldLog {
  if (typeof window === "undefined") return EMPTY;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return EMPTY;
    const parsed = JSON.parse(raw) as Partial<FieldLog>;
    return {
      streak: typeof parsed.streak === "number" ? parsed.streak : 0,
      lastDate: typeof parsed.lastDate === "string" ? parsed.lastDate : null,
      answered: parsed.answered && typeof parsed.answered === "object" ? parsed.answered : {},
    };
  } catch {
    return EMPTY;
  }
}

let cache = read();
const listeners = new Set<() => void>();

function emit() {
  cache = read();
  listeners.forEach((l) => l());
}

if (typeof window !== "undefined") {
  window.addEventListener("storage", (e) => {
    if (e.key === KEY) emit();
  });
}

function prevUtcDate(key: string): string {
  const [y, m, d] = key.split("-").map(Number);
  const dt = new Date(Date.UTC(y!, m! - 1, d!));
  dt.setUTCDate(dt.getUTCDate() - 1);
  return utcDateKey(dt);
}

export function recordAnswer(id: string, correct: boolean, daily = false): FieldLog {
  const next: FieldLog = {
    streak: cache.streak,
    lastDate: cache.lastDate,
    answered: { ...cache.answered, [id]: correct },
  };
  if (daily) {
    const today = utcDateKey();
    if (cache.lastDate !== today) {
      if (correct) {
        next.streak = cache.lastDate === prevUtcDate(today) ? cache.streak + 1 : 1;
      } else {
        next.streak = 0;
      }
      next.lastDate = today;
    }
  }
  window.localStorage.setItem(KEY, JSON.stringify(next));
  emit();
  return next;
}

export function useFieldLog(): FieldLog {
  return useSyncExternalStore(
    (cb) => {
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
    () => cache,
    () => EMPTY,
  );
}
