import { useSyncExternalStore } from "react";

export type PlateRequest = {
  id: string;
  guess: string;
  note: string;
  at: string;
};

const KEY = "wildmates.plateRequests";
const EMPTY: PlateRequest[] = [];

function read(): PlateRequest[] {
  if (typeof window === "undefined") return EMPTY;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return EMPTY;
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return EMPTY;
    return parsed.filter(
      (row): row is PlateRequest =>
        row &&
        typeof row === "object" &&
        typeof row.id === "string" &&
        typeof row.guess === "string",
    );
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

export function addPlateRequest(guess: string, note: string): PlateRequest {
  const row: PlateRequest = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    guess: guess.trim().slice(0, 120) || "Unknown animal",
    note: note.trim().slice(0, 400),
    at: new Date().toISOString(),
  };
  const next = [row, ...cache].slice(0, 40);
  window.localStorage.setItem(KEY, JSON.stringify(next));
  emit();
  return row;
}

export function usePlateRequests(): PlateRequest[] {
  return useSyncExternalStore(
    (cb) => {
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
    () => cache,
    () => EMPTY,
  );
}
