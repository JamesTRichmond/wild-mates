import { type StrategySlug } from "./strategies";

export const SPECIES_PHOTO_SLUGS = new Set([
  "sage-grouse",
  "wandering-albatross",
  "emperor-dragonfly",
  "coho-salmon",
  "komodo-dragon",
  "northern-jacana",
  "meerkat",
  "elkhorn-coral",
  "ocellaris-clownfish",
  "indian-peafowl",
  "giant-cuttlefish",
  "african-wild-dog",
  "bald-eagle",
  "new-mexico-whiptail",
  "burying-beetle",
  "bonnethead-shark",
  "ruff",
  "prairie-vole",
  "bluehead-wrasse",
]);

export function strategyPhoto(slug: StrategySlug): string {
  return `/media/strategies/${slug}.jpg`;
}

export function speciesPhoto(slug: string, strategy: StrategySlug): string {
  if (SPECIES_PHOTO_SLUGS.has(slug)) return `/media/species/${slug}.jpg`;
  return strategyPhoto(strategy);
}

export function hasSpeciesPortrait(slug: string): boolean {
  return SPECIES_PHOTO_SLUGS.has(slug);
}
