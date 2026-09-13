import { SPECIES, type Biome, type BodyPlan, type Species } from "./catalog/species";
import { type StrategySlug } from "./catalog/strategies";

/**
 * Multi-access diagnostic key for this 54-plate catalog.
 *
 * Field keys historically split:
 *   - dichotomous (one couplet at a time; a wrong turn is fatal)
 *   - multi-access / polyclave (DELTA, Lucid): score independent characters
 *
 * We use the second, ranked with a Naive Bayes model — the same family of
 * classifier used on DNA barcode reference libraries — plus hard elimination
 * on body plan (a class-level character). Vision, if present, is late-fused
 * as one more likelihood, not a separate answer.
 */

export type RitualSign =
  | "arena"
  | "pair-unit"
  | "attendance"
  | "alt-male"
  | "unmated-clutch"
  | "male-brood"
  | "helpers"
  | "broadcast"
  | "size-queue";

export type Observation = {
  body?: BodyPlan | "";
  biome?: Biome | "";
  signs?: RitualSign[];
  query?: string;
  photoSlug?: string | null;
  photoConfidence?: "low" | "medium" | "high";
};

export const SIGN_BY_STRATEGY: Record<StrategySlug, RitualSign> = {
  lekking: "arena",
  "pair-bonding": "pair-unit",
  "mate-guarding": "attendance",
  "sneaker-males": "alt-male",
  parthenogenesis: "unmated-clutch",
  polyandry: "male-brood",
  "cooperative-breeding": "helpers",
  "broadcast-spawning": "broadcast",
  "sequential-hermaphroditism": "size-queue",
};

export const SIGN_OPTIONS: { value: RitualSign; label: string; hint: string }[] = [
  { value: "arena", label: "Arena display", hint: "Males gather. Females walk and leave." },
  { value: "pair-unit", label: "A working pair", hint: "Two adults share a nest, range, or brood." },
  { value: "attendance", label: "Close attendance", hint: "One stays so a rival cannot overwrite the clutch." },
  { value: "alt-male", label: "Two male tactics", hint: "A territorial type and a smaller or sneaking type." },
  { value: "unmated-clutch", label: "Clutch without a mate", hint: "Eggs or young with no visitor required." },
  { value: "male-brood", label: "Male on the nest", hint: "He incubates or broods; she may hold territory." },
  { value: "helpers", label: "Non-breeders helping", hint: "The pack, den, or granary raises the litter." },
  { value: "broadcast", label: "Gametes in water", hint: "Timing and current, not a pair." },
  { value: "size-queue", label: "Sex follows rank", hint: "Vacancy or size writes the next body." },
];

const PHOTO_HIT: Record<NonNullable<Observation["photoConfidence"]>, number> = {
  high: 0.88,
  medium: 0.68,
  low: 0.45,
};

const STOP = new Set([
  "the",
  "and",
  "for",
  "with",
  "from",
  "that",
  "this",
  "into",
  "over",
  "near",
  "not",
  "are",
  "was",
  "were",
]);

function tokens(raw: string): string[] {
  return raw
    .toLowerCase()
    .split(/[^a-z0-9-]+/i)
    .map((w) => w.trim())
    .filter((w) => w.length > 2 && !STOP.has(w));
}

function haystack(s: Species): string {
  return [
    s.name,
    s.latin,
    s.tagline,
    s.habitat,
    s.region,
    s.summary,
    s.ritual,
    s.diet,
    s.strategy,
  ]
    .join(" ")
    .toLowerCase();
}

type Scored = {
  species: Species;
  logL: number;
  eliminated: boolean;
  evidence: string[];
};

function scoreSpecies(s: Species, obs: Observation): Scored {
  let logL = 0;
  const evidence: string[] = [];
  let eliminated = false;

  if (obs.body) {
    if (s.body === obs.body) {
      logL += Math.log(0.96);
      evidence.push("Body plan");
    } else {
      eliminated = true;
      logL += Math.log(0.01);
    }
  }

  if (obs.biome) {
    if (s.biome === obs.biome) {
      logL += Math.log(0.82);
      evidence.push("Habitat");
    } else {
      logL += Math.log(0.14);
    }
  }

  const signs = obs.signs?.filter(Boolean) ?? [];
  if (signs.length) {
    const own = SIGN_BY_STRATEGY[s.strategy];
    if (signs.includes(own)) {
      logL += Math.log(0.9);
      evidence.push("Ritual sign");
    } else {
      logL += Math.log(0.08);
    }
  }

  const q = (obs.query ?? "").trim();
  if (q) {
    const hay = haystack(s);
    let hits = 0;
    for (const w of tokens(q)) {
      if (hay.includes(w)) hits += 1;
    }
    if (hits) {
      logL += Math.log(1 + 0.35 * hits);
      evidence.push("Field notes");
    }
  }

  if (obs.photoSlug) {
    const pHit = PHOTO_HIT[obs.photoConfidence ?? "medium"];
    if (s.slug === obs.photoSlug) {
      logL += Math.log(pHit);
      evidence.push("Photograph");
    } else {
      logL += Math.log((1 - pHit) / Math.max(1, SPECIES.length - 1));
    }
  }

  return { species: s, logL, eliminated, evidence };
}

export type Ranked = {
  species: Species;
  support: number;
  evidence: string[];
};

export type RankResult = {
  matches: Ranked[];
  remaining: number;
  ruledOut: number;
};

function hasSignal(obs: Observation): boolean {
  return Boolean(
    obs.body ||
      obs.biome ||
      (obs.signs && obs.signs.length) ||
      (obs.query && obs.query.trim()) ||
      obs.photoSlug,
  );
}

export function rankObservation(obs: Observation): Ranked[] {
  return rankKey(obs).matches;
}

export function rankKey(obs: Observation): RankResult {
  if (!hasSignal(obs)) return { matches: [], remaining: SPECIES.length, ruledOut: 0 };

  const scored = SPECIES.map((s) => scoreSpecies(s, obs));
  const live = scored.filter((s) => !s.eliminated);
  const ruledOut = scored.length - live.length;
  if (!live.length) return { matches: [], remaining: 0, ruledOut };

  const max = Math.max(...live.map((s) => s.logL));
  const weights = live.map((s) => ({
    ...s,
    w: Math.exp(s.logL - max),
  }));
  const z = weights.reduce((n, s) => n + s.w, 0) || 1;
  const matches = weights
    .map((s) => ({
      species: s.species,
      support: s.w / z,
      evidence: s.evidence,
    }))
    .sort(
      (a, b) =>
        b.support - a.support || a.species.name.localeCompare(b.species.name),
    )
    .slice(0, 8);

  return { matches, remaining: live.length, ruledOut };
}

export const BODY_OPTIONS: { value: BodyPlan; label: string }[] = [
  { value: "bird", label: "Bird" },
  { value: "mammal", label: "Mammal" },
  { value: "fish", label: "Fish" },
  { value: "reptile", label: "Reptile" },
  { value: "amphibian", label: "Amphibian" },
  { value: "insect", label: "Insect" },
  { value: "marine", label: "Aquatic invertebrate" },
];

export const BIOME_OPTIONS: { value: Biome; label: string }[] = [
  { value: "grassland", label: "Grassland / steppe" },
  { value: "forest", label: "Forest" },
  { value: "desert", label: "Desert / arid" },
  { value: "freshwater", label: "Lakes, ponds, rivers" },
  { value: "marine", label: "Ocean / reef" },
  { value: "sky", label: "Aerial" },
  { value: "island", label: "Oceanic island" },
  { value: "urban-edge", label: "Gardens / edges" },
];

export const ALGORITHM_NOTES = [
  {
    id: "multi-access",
    title: "Multi-access key",
    used: true,
    body: "Characters are scored independently — body plan, habitat, a visible ritual — then ranked. This is the DELTA / Lucid tradition. A wrong habitat does not kill the ID the way a wrong turn in a dichotomous key does.",
  },
  {
    id: "naive-bayes",
    title: "Naive Bayes ranker",
    used: true,
    body: "Each plate gets a likelihood for every scored character. Body plan is treated as diagnostic (mismatch eliminates). Habitat and ritual signs are softer. The list is relative support among plates still in play, not a percentage of all life.",
  },
  {
    id: "vision",
    title: "Computer vision",
    used: true,
    body: "PlantNet and iNaturalist train convolutional or transformer models on millions of photos, then often fuse geography. Here a vision pass is constrained to these 54 plates and late-fused into the same key — one more likelihood, not a second answer.",
  },
  {
    id: "barcode",
    title: "DNA barcoding",
    used: false,
    body: "A short marker (COI in animals, rbcL/matK in plants, ITS in fungi) is matched to a reference library with BLAST or another Naive Bayes classifier. This field kit does not sequence. A photo is not a barcode.",
  },
] as const;
