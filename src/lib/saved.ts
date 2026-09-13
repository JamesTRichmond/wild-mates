import { useSyncExternalStore } from "react";

const KEY = "wild-mates:saved";

const EMPTY_SAVED: string[] = [];

function read(): string[] {
  if (typeof window === "undefined") return EMPTY_SAVED;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return EMPTY_SAVED;
    const parsed = JSON.parse(raw) as unknown;
    return Array.isArray(parsed) ? parsed.filter((x) => typeof x === "string") : EMPTY_SAVED;
  } catch {
    return EMPTY_SAVED;
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

export function getSavedSlugs(): string[] {
  return cache;
}

export function isSaved(slug: string): boolean {
  return cache.includes(slug);
}

export function toggleSaved(slug: string): boolean {
  const next = cache.includes(slug) ? cache.filter((s) => s !== slug) : [...cache, slug];
  window.localStorage.setItem(KEY, JSON.stringify(next));
  emit();
  return next.includes(slug);
}

export function useSavedSlugs(): string[] {
  return useSyncExternalStore(
    (cb) => {
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
    () => cache,
    () => EMPTY_SAVED,
  );
}

export function useIsSaved(slug: string): boolean {
  const slugs = useSavedSlugs();
  return slugs.includes(slug);
}
