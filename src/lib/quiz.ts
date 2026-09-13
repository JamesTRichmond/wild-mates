import { type Species } from "./catalog/species";
import { STRATEGIES, strategyBySlug, type Strategy, type StrategySlug } from "./catalog/strategies";

export type QuizItem = {
  id: string;
  prompt: string;
  choices: string[];
  correct: number;
  why: string;
};

function hashSeed(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function rng(seed: number) {
  let a = seed || 1;
  return () => {
    a = (Math.imul(a, 1664525) + 1013904223) >>> 0;
    return a / 4294967296;
  };
}

function pickDistractors<T>(all: T[], keep: T, n: number, seed: string): T[] {
  const rest = all.filter((x) => x !== keep);
  const rand = rng(hashSeed(seed));
  const copy = [...rest];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [copy[i], copy[j]] = [copy[j]!, copy[i]!];
  }
  return copy.slice(0, n);
}

function shuffleChoices(correctLabel: string, others: string[], seed: string): { choices: string[]; correct: number } {
  const rand = rng(hashSeed(seed + ":c"));
  const choices = [correctLabel, ...others];
  for (let i = choices.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [choices[i], choices[j]] = [choices[j]!, choices[i]!];
  }
  return { choices, correct: choices.indexOf(correctLabel) };
}

export function utcDateKey(date = new Date()): string {
  return `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, "0")}-${String(date.getUTCDate()).padStart(2, "0")}`;
}

export function dailyQuestion(species: Species, date = new Date()): QuizItem {
  const strategy = strategyBySlug[species.strategy];
  const names = STRATEGIES.map((s) => s.name);
  const distractors = pickDistractors(names, strategy.name, 3, `${utcDateKey(date)}:${species.slug}`);
  const { choices, correct } = shuffleChoices(
    strategy.name,
    distractors,
    `${utcDateKey(date)}:${species.slug}:q`,
  );
  return {
    id: `daily:${utcDateKey(date)}`,
    prompt: `Today's plate is ${species.name}. Which system organizes its reproduction?`,
    choices,
    correct,
    why: `${species.name} is filed under ${strategy.name}. ${species.summary}`,
  };
}

export function speciesQuestion(species: Species): QuizItem {
  const strategy = strategyBySlug[species.strategy];
  const names = STRATEGIES.map((s) => s.name);
  const distractors = pickDistractors(names, strategy.name, 3, species.slug);
  const { choices, correct } = shuffleChoices(strategy.name, distractors, `${species.slug}:sp`);
  return {
    id: `species:${species.slug}`,
    prompt: `Which reproductive strategy is ${species.name} a field example of?`,
    choices,
    correct,
    why: strategy.tagline + " " + species.ritual,
  };
}

const STRATEGY_EXTRA: Record<StrategySlug, { prompt: string; answer: string; decoys: string[]; why: string }> = {
  lekking: {
    prompt: "On a lek, what are males mainly advertising?",
    answer: "Themselves — not a food territory or a nest site",
    decoys: [
      "A shared den the group will use",
      "A clutch they have already begun to incubate",
      "A migration route for the winter",
    ],
    why: "The arena is the advertisement. Females visit, assess, and leave; males typically provide no care.",
  },
  "pair-bonding": {
    prompt: "Social monogamy in this catalog means…",
    answer: "A working pair that shares territory or young — not genetic exclusivity",
    decoys: [
      "That extra-pair mating never occurs",
      "That only the female feeds the young",
      "That the pair forms for a single hour",
    ],
    why: "A pair is an alliance around expensive young or a territory. Extra-pair mating still happens in many species.",
  },
  "mate-guarding": {
    prompt: "Mate-guarding pays when…",
    answer: "The fertile window is short and rivals are dense",
    decoys: [
      "Young always require a dozen helpers",
      "Eggs develop without fertilization",
      "Gametes are released on a lunar cue miles apart",
    ],
    why: "Staying close blocks competitors. The cost is time that could have been spent seeking other partners.",
  },
  "sneaker-males": {
    prompt: "Sneaker males persist in a population because…",
    answer: "The cheap tactic does well when it is rare",
    decoys: [
      "Every male eventually becomes the dominant type",
      "Females never notice more than one male",
      "The species has abandoned sexual reproduction",
    ],
    why: "Frequency dependence: when the dominant tactic is crowded, an alternative can invade.",
  },
  parthenogenesis: {
    prompt: "Parthenogenesis is…",
    answer: "Development of offspring without fertilization",
    decoys: [
      "A male changing sex after winning a territory",
      "Two adults sharing a single nest for life",
      "Broadcast of eggs and sperm on the same tide",
    ],
    why: "Some lineages are obligately asexual; others switch when mates are scarce. Genetic mixing is the usual cost.",
  },
  polyandry: {
    prompt: "In classic sex-role-reversed polyandry…",
    answer: "Males are the limiting care-givers, so females may take successive partners",
    decoys: [
      "Males gather on an arena and females only watch",
      "A queen is the only member of the colony that works",
      "Eggs are left adrift with no adult in attendance and no later care by males",
    ],
    why: "If males incubate, pouch, or nest-guard, a female can gain by laying successive clutches.",
  },
  "cooperative-breeding": {
    prompt: "Helpers at a nest or den are usually…",
    answer: "Extra adults, often kin, who feed or guard while a dominant pair breeds",
    decoys: [
      "Unrelated predators tolerated for warmth",
      "Males who never see the young",
      "Clones produced without any adult care",
    ],
    why: "Helping can pay when territories are saturated, kinship is high, or the helper later inherits the site.",
  },
  "broadcast-spawning": {
    prompt: "Broadcast spawning relies on…",
    answer: "Synchrony — eggs and sperm meeting in the water on a shared cue",
    decoys: [
      "A pair that incubates a single egg for months",
      "One male guarding a carcass until larvae leave",
      "A queen mating once and storing sperm for years only inside a hive",
    ],
    why: "Timing is ecology: moon, tide, temperature, neighbors. There is usually no care after release.",
  },
  "sequential-hermaphroditism": {
    prompt: "The size-advantage model says an animal changes sex when…",
    answer: "Fertility or mating success would rise faster in the other role at that size",
    decoys: [
      "The lunar calendar reaches the third quarter",
      "Helpers refuse to feed the dominant pair",
      "A lek has more than ten displaying males",
    ],
    why: "Clownfish start male and the largest becomes female. Many wrasses start female and a large individual becomes the territorial male.",
  },
};

export function strategyQuestion(strategy: Strategy): QuizItem {
  const extra = STRATEGY_EXTRA[strategy.slug];
  const { choices, correct } = shuffleChoices(extra.answer, extra.decoys, strategy.slug);
  return {
    id: `strategy:${strategy.slug}`,
    prompt: extra.prompt,
    choices,
    correct,
    why: extra.why,
  };
}
