export const STRATEGY_SLUGS = [
  "lekking",
  "pair-bonding",
  "mate-guarding",
  "sneaker-males",
  "parthenogenesis",
  "polyandry",
  "cooperative-breeding",
  "broadcast-spawning",
  "sequential-hermaphroditism",
] as const;

export type StrategySlug = (typeof STRATEGY_SLUGS)[number];

export type Strategy = {
  slug: StrategySlug;
  name: string;
  latinHint: string;
  tagline: string;
  summary: string;
  howItWorks: string;
  ecologicalNote: string;
};

export const STRATEGIES: Strategy[] = [
  {
    slug: "lekking",
    name: "Lekking",
    latinHint: "arena display",
    tagline: "Males gather. Females choose.",
    summary:
      "A lek is a communal display ground. Males cluster, advertise with sound, color, or movement, and contribute little or no parental care. Females visit, assess, and leave.",
    howItWorks:
      "Because many rivals stand in view at once, female choice can be extreme: a few males gain most of the matings. The arena is the advertisement, not a territory that holds food or nest sites.",
    ecologicalNote:
      "Classic in sage-grouse, many birds-of-paradise, some antelope, and a few bats. Costly ornaments evolve where the payoff to being chosen is high.",
  },
  {
    slug: "pair-bonding",
    name: "Pair bonding",
    latinHint: "social monogamy",
    tagline: "Two adults, one breeding unit.",
    summary:
      "A stable pair shares territory, nest, or young. Social monogamy is not the same as genetic monogamy: extra-pair mating still happens in many species.",
    howItWorks:
      "Biparental care pays when young are expensive — long flights to feeding grounds, helpless nestlings, or territories that two can hold better than one.",
    ecologicalNote:
      "Albatrosses, many raptors, some fish, and a few mammals (prairie voles, some gibbons) keep long associations. Pair does not mean romance; it means a working alliance.",
  },
  {
    slug: "mate-guarding",
    name: "Mate-guarding",
    latinHint: "close attendance",
    tagline: "Stay close, reduce rivals.",
    summary:
      "One animal (often the male) remains with a partner through a fertile window, blocking competitors rather than wandering to find more mates.",
    howItWorks:
      "Guarding is favored when the fertile period is short, rivals are dense, and last-male or first-male advantage is strong. The cost is time that could have been spent seeking other partners.",
    ecologicalNote:
      "Dragonflies in tandem flight, burying beetles on a carcass, and some primates all illustrate the same trade-off: protect this mating or gamble on the next one.",
  },
  {
    slug: "sneaker-males",
    name: "Sneaker males",
    latinHint: "alternative tactics",
    tagline: "Not every male plays the same game.",
    summary:
      "Within one species, some males hold territories or ornaments while others are small, female-mimicking, or satellite — stealing fertilizations instead of winning contests.",
    howItWorks:
      "When the dominant tactic is crowded, a cheaper tactic can invade. Frequency dependence keeps both types in the population: sneakers do well when they are rare.",
    ecologicalNote:
      "Salmon jacks, bluegill cuckolders, giant cuttlefish female mimics, and the three-color throat morphs of side-blotched lizards are textbook cases.",
  },
  {
    slug: "parthenogenesis",
    name: "Parthenogenesis",
    latinHint: "virgin development",
    tagline: "Offspring without fertilization.",
    summary:
      "Eggs develop into embryos without sperm. Some lineages are obligately asexual; others switch when mates are scarce.",
    howItWorks:
      "Clonal or half-clonal reproduction avoids the cost of finding a mate and can found a population from one individual. The usual cost is reduced genetic mixing.",
    ecologicalNote:
      "New Mexico whiptails, Amazon mollies, marbled crayfish, and rare events in Komodo dragons and some sharks document how widespread the option is.",
  },
  {
    slug: "polyandry",
    name: "Polyandry",
    latinHint: "one female, several males",
    tagline: "Females mate with more than one male.",
    summary:
      "A female’s eggs or brood are fertilized or cared for by multiple males in one season. Sex roles may reverse: males incubate, females compete.",
    howItWorks:
      "If males are the limiting care-givers (pouches, incubation, nest defense), females can gain by laying successive clutches with different partners.",
    ecologicalNote:
      "Jacanas, phalaropes, pipefish, honey bee queens, and some primates show different mechanical routes to the same mating system.",
  },
  {
    slug: "cooperative-breeding",
    name: "Cooperative breeding",
    latinHint: "alloparental care",
    tagline: "More than two adults raise the young.",
    summary:
      "Helpers — often offspring from earlier broods — feed, guard, or babysit. Reproduction is shared unevenly; one pair or queen usually dominates.",
    howItWorks:
      "Helping can pay when territories are saturated, kinship is high, or the helper later inherits the site. It is not simple altruism; inclusive fitness and delayed benefits both matter.",
    ecologicalNote:
      "Meerkats, Florida scrub-jays, African wild dogs, superb fairy-wrens, naked mole-rats, and acorn woodpeckers are the usual field examples.",
  },
  {
    slug: "broadcast-spawning",
    name: "Broadcast spawning",
    latinHint: "external gametes",
    tagline: "Eggs and sperm meet in the water.",
    summary:
      "Adults release gametes into the surrounding water, often on a shared cue: tide, moon, temperature. Fertilization is a numbers game in three dimensions.",
    howItWorks:
      "Synchrony raises the chance that gametes meet and can swamp predators. There is no pair bond and usually no parental care after release.",
    ecologicalNote:
      "Reef corals, many sea urchins, oysters, jellies, and broadcast fishes use mass spawning. Timing is ecology, not ceremony.",
  },
  {
    slug: "sequential-hermaphroditism",
    name: "Sequential hermaphroditism",
    latinHint: "sex change",
    tagline: "One body, two sexual roles across life.",
    summary:
      "An individual functions as one sex, then the other. Protandry starts male; protogyny starts female. The switch tracks size, social rank, or vacancy.",
    howItWorks:
      "The size-advantage model: if female fertility rises faster with size (or a male’s mating success depends on being largest), selection favors changing sex at the right moment.",
    ecologicalNote:
      "Clownfish (male then female), wrasses and parrotfishes (female then male), and slipper limpets stacked in chains are the clean demonstrations.",
  },
];

export const strategyBySlug = Object.fromEntries(
  STRATEGIES.map((s) => [s.slug, s]),
) as Record<StrategySlug, Strategy>;
