import { type StrategySlug } from "./strategies";

export type PlayStatus = "missing" | "place-still" | "motion-loop" | "beat-motion";
export type ReelKind = "theatre" | "clay";

export type RitualReel = {
  kind: ReelKind;
  status: PlayStatus;
  poster: string;
  src?: string;
  loopSilent?: string;
  titleCard: string;
  line: string;
};

export type RitualVoice = { who: string; line: string };

export type RitualPlay = {
  speciesSlug: string;
  strategySlug: StrategySlug;
  status: PlayStatus;
  defaultReel: ReelKind;
  flagship: boolean;
  caption: "Illustrated clay plate — not field footage.";
  durationSec: number;
  hasAudio?: boolean;
  beats: { id: string; line: string }[];
  voices?: RitualVoice[];
  zoologistLock: string[];
  /** Shown in accent when a clip drifts from the lock. */
  clipNote?: string;
  theatre?: RitualReel;
  clay: RitualReel;
};

const CAPTION = "Illustrated clay plate — not field footage." as const;

function place(slug: string, kind: ReelKind) {
  return `/media/ritual/place/${slug}-${kind}.jpg`;
}
function film(slug: string, kind: ReelKind) {
  return `/media/ritual/films/${slug}-${kind}.mp4?v=plain1`;
}
function loop(slug: string) {
  return `/media/ritual/loops/${slug}-clay.mp4`;
}
function clayStill(slug: string) {
  return `/media/ritual/place/${slug}-clay.jpg`;
}

export const FLAGSHIP_BY_STRATEGY: Record<StrategySlug, string> = {
  lekking: "sage-grouse",
  "pair-bonding": "wandering-albatross",
  "mate-guarding": "emperor-dragonfly",
  "sneaker-males": "coho-salmon",
  parthenogenesis: "komodo-dragon",
  polyandry: "northern-jacana",
  "cooperative-breeding": "african-wild-dog",
  "broadcast-spawning": "elkhorn-coral",
  "sequential-hermaphroditism": "ocellaris-clownfish",
};

const FLAGSHIPS: RitualPlay[] = [
  {
    speciesSlug: "sage-grouse",
    strategySlug: "lekking",
    status: "beat-motion",
    defaultReel: "clay",
    flagship: true,
    caption: CAPTION,
    durationSec: 60,
    hasAudio: true,
    beats: [
      { id: "place", line: "Males gather at dawn on a patch of sagebrush. That gathering is called a lek — a display ground, not a nest." },
      { id: "signal", line: "He fans his tail, inflates yellow sacs on his chest, and makes a booming sound while he struts." },
      { id: "choice", line: "Hens walk through and compare the males. A few get chosen. Most males on the lek never mate." },
      { id: "note", line: "After she chooses, she leaves and nests alone. He stays on the lek. He does not sit on the eggs." },
    ],
    voices: [
      { who: "Male", line: "If I were a greater sage-grouse, I would go to the same patch of sage at dawn and show off." },
      { who: "Female", line: "I walk the lek, I pick a male, then I nest alone in the sagebrush. He does not help with the chicks." },
    ],
    zoologistLock: [
      "Males do not provision or attend the nest.",
      "Gular sacs are not lungs.",
      "Do not convert female choice into dating advice.",
    ],
    theatre: {
      kind: "theatre",
      status: "beat-motion",
      poster: place("sage-grouse", "theatre"),
      src: film("sage-grouse", "theatre"),
      titleCard: "If I were a sage-grouse",
      line: "I boom and strut on the lek. She walks through, picks a male, and leaves.",
    },
    clay: {
      kind: "clay",
      status: "beat-motion",
      poster: place("sage-grouse", "clay"),
      src: film("sage-grouse", "clay"),
      loopSilent: loop("sage-grouse"),
      titleCard: "A lek is a display ground",
      line: "Many males show off. A few get chosen. The nest is somewhere else, and she builds it.",
    },
  },
  {
    speciesSlug: "wandering-albatross",
    strategySlug: "pair-bonding",
    status: "beat-motion",
    defaultReel: "clay",
    flagship: true,
    caption: CAPTION,
    durationSec: 60,
    hasAudio: true,
    beats: [
      { id: "place", line: "They spend months over the ocean, then meet again on the same island." },
      { id: "signal", line: "They dance: bills pointed at the sky, circling, calling. That dance is how they confirm they are still a pair." },
      { id: "choice", line: "They lay one egg. Not two or three. One. They take turns sitting on it." },
      { id: "note", line: "A chick this large takes about two years to raise. Both parents share the work." },
    ],
    voices: [
      { who: "One parent", line: "If I were a wandering albatross, I would fly for months, then come back to this island and find my partner." },
      { who: "The other parent", line: "We keep one egg. We take turns on the nest. Raising this chick is a two-year job for both of us." },
    ],
    zoologistLock: [
      "Lifelong social pair; courtship can take years.",
      "Not continuous annual breeding.",
      "One egg; both incubate.",
    ],
    clipNote: "This plate keeps one egg. If the clip shows more, the clip is wrong.",
    theatre: {
      kind: "theatre",
      status: "beat-motion",
      poster: place("wandering-albatross", "theatre"),
      src: film("wandering-albatross", "theatre"),
      titleCard: "If I were an albatross",
      line: "We dance to confirm the pair. We raise one egg, taking turns on the nest.",
    },
    clay: {
      kind: "clay",
      status: "beat-motion",
      poster: place("wandering-albatross", "clay"),
      src: film("wandering-albatross", "clay"),
      loopSilent: loop("wandering-albatross"),
      titleCard: "One egg, two parents",
      line: "The dance takes years to learn. The chick takes two years to raise.",
    },
  },
  {
    speciesSlug: "emperor-dragonfly",
    strategySlug: "mate-guarding",
    status: "beat-motion",
    defaultReel: "clay",
    flagship: true,
    caption: CAPTION,
    durationSec: 60,
    hasAudio: true,
    beats: [
      { id: "place", line: "Still water and reeds. This pond edge is his hunting and mating ground." },
      { id: "signal", line: "He grabs her behind the head and they fly together. That hold is called tandem." },
      { id: "choice", line: "He stays attached so another male cannot replace the sperm she is about to use." },
      { id: "note", line: "This is guarding, not cuddling. She lays eggs into a plant stem. We stop the picture before they form the mating wheel." },
    ],
    voices: [
      { who: "Male", line: "If I were an emperor dragonfly, I would hold her and fly with her so the next male cannot take my place." },
      { who: "Female", line: "I lay eggs into the reed. He watches the air above me. Then we fade the picture." },
    ],
    zoologistLock: [
      "Contact vs hover guard.",
      "Fade before the wheel.",
      "Do not call tandem cuddling.",
    ],
    theatre: {
      kind: "theatre",
      status: "beat-motion",
      poster: place("emperor-dragonfly", "theatre"),
      src: film("emperor-dragonfly", "theatre"),
      titleCard: "If I were a dragonfly",
      line: "I hold her in tandem so another male cannot replace me. That is guarding, not a hug.",
    },
    clay: {
      kind: "clay",
      status: "beat-motion",
      poster: place("emperor-dragonfly", "clay"),
      src: film("emperor-dragonfly", "clay"),
      loopSilent: loop("emperor-dragonfly"),
      titleCard: "Tandem over the pond",
      line: "He holds on. She lays eggs in the reed. We stop before they mate in a wheel.",
    },
  },
  {
    speciesSlug: "coho-salmon",
    strategySlug: "sneaker-males",
    status: "beat-motion",
    defaultReel: "clay",
    flagship: true,
    caption: CAPTION,
    durationSec: 60,
    hasAudio: true,
    beats: [
      { id: "place", line: "They swim home to the stream where they hatched. The female digs a nest in the gravel with her tail. That nest is called a redd — a shallow bowl in the stones." },
      { id: "signal", line: "A big male, called a hooknose because his jaw hooked as he got ready to spawn, fights other big males to stand next to her." },
      { id: "choice", line: "A smaller male, called a jack, grew up fast and came back after one ocean winter. He hides by a rock, then darts in when she lays eggs." },
      { id: "note", line: "Both kinds of males can fertilize the eggs. A jack is not a failed fighter. We stop the story as the eggs settle into the gravel." },
    ],
    voices: [
      { who: "Female", line: "If I were a coho salmon, I would swim home and dig a nest in the gravel. That nest is called a redd." },
      { who: "Big male (hooknose)", line: "I fight other large males so I can stand next to her. That fight is how I get a chance to fertilize her eggs." },
      { who: "Small male (jack)", line: "I do not fight. I hide, then I dart in when she lays. I can father young too." },
    ],
    zoologistLock: [
      "Scale + timing; no cuck language.",
      "No milt close-up as a sex act.",
      "Eggs into gravel is the fade.",
    ],
    theatre: {
      kind: "theatre",
      status: "beat-motion",
      poster: place("coho-salmon", "theatre"),
      src: film("coho-salmon", "theatre"),
      titleCard: "If I were a coho salmon",
      line: "The female digs a gravel nest. The big male fights. The small male sneaks in. Both can father the young.",
    },
    clay: {
      kind: "clay",
      status: "beat-motion",
      poster: place("coho-salmon", "clay"),
      src: film("coho-salmon", "clay"),
      loopSilent: loop("coho-salmon"),
      titleCard: "A redd is a gravel nest",
      line: "Hooknose means the big fighting male. Jack means the smaller sneaker. Two ways to reach the same eggs.",
    },
  },
  {
    speciesSlug: "komodo-dragon",
    strategySlug: "parthenogenesis",
    status: "beat-motion",
    defaultReel: "clay",
    flagship: true,
    caption: CAPTION,
    durationSec: 60,
    hasAudio: true,
    beats: [
      { id: "place", line: "Sometimes a female nests even though no male visited. She still lays eggs in a mound." },
      { id: "signal", line: "Those eggs can start without mating. That is called parthenogenesis — development without sperm." },
      { id: "choice", line: "The babies that hatch this way are sons, not copies of her. They are not clones." },
      { id: "note", line: "This is a backup when no mate is around. Most clutches still come from ordinary pairing." },
    ],
    voices: [
      { who: "Female", line: "If I were a Komodo dragon and no male showed up, I could still nest. My eggs can start without mating." },
      { who: "Young", line: "We who hatch this way are sons. We are not copies of our mother." },
    ],
    zoologistLock: [
      "ZW female. Viable parthenogenetic young are ZZ sons.",
      "Not clones. WW typically fails.",
      "No mother-son staging.",
    ],
    theatre: {
      kind: "theatre",
      status: "beat-motion",
      poster: place("komodo-dragon", "theatre"),
      src: film("komodo-dragon", "theatre"),
      titleCard: "If I nested alone",
      line: "Eggs can start without a male. The young that hatch this way are sons, not clones.",
    },
    clay: {
      kind: "clay",
      status: "beat-motion",
      poster: place("komodo-dragon", "clay"),
      src: film("komodo-dragon", "clay"),
      loopSilent: loop("komodo-dragon"),
      titleCard: "A backup, not the usual path",
      line: "No visitor this clutch. The mound still holds eggs. The hatchlings are sons.",
    },
  },
  {
    speciesSlug: "northern-jacana",
    strategySlug: "polyandry",
    status: "beat-motion",
    defaultReel: "clay",
    flagship: true,
    caption: CAPTION,
    durationSec: 60,
    hasAudio: true,
    beats: [
      { id: "place", line: "She owns a stretch of marsh. That territory holds several small nests on floating plants." },
      { id: "signal", line: "One to four males nest on her ground. She defends the marsh. They sit on the eggs." },
      { id: "choice", line: "Each male incubates his own clutch — usually one to four eggs. She does not sit this nest." },
      { id: "note", line: "This is role reversal: she holds the land, he keeps the eggs. It is not a joke about people." },
    ],
    voices: [
      { who: "Female", line: "If I were a northern jacana, I would own this marsh. One to four males nest on my ground." },
      { who: "Male", line: "I sit on this nest. One to four eggs. She keeps the territory. I keep the clutch." },
    ],
    zoologistLock: [
      "Simultaneous polyandry + sex-role reversal.",
      "Not a dating joke, not a throuple.",
      "She holds territory covering 1–4 males.",
    ],
    theatre: {
      kind: "theatre",
      status: "beat-motion",
      poster: place("northern-jacana", "theatre"),
      src: film("northern-jacana", "theatre"),
      titleCard: "If I were a jacana",
      line: "She owns the marsh. He sits the nest. One female, several incubating males.",
    },
    clay: {
      kind: "clay",
      status: "beat-motion",
      poster: place("northern-jacana", "clay"),
      src: film("northern-jacana", "clay"),
      loopSilent: loop("northern-jacana"),
      titleCard: "He sits. She patrols.",
      line: "Several nests at once. His job is this cup of eggs.",
    },
  },
  {
    speciesSlug: "african-wild-dog",
    strategySlug: "cooperative-breeding",
    status: "beat-motion",
    defaultReel: "clay",
    flagship: true,
    caption: CAPTION,
    durationSec: 60,
    hasAudio: true,
    beats: [
      { id: "place", line: "A den, a pack, one season’s pups. Not every adult breeds this year." },
      { id: "signal", line: "Usually one pair has the litter. The others hunt and bring meat back to the den." },
      { id: "choice", line: "Helpers feed pups they did not father. Food is passed at the den mouth." },
      { id: "note", line: "A helper is why a litter this size can live. The pack is the parenting unit." },
    ],
    voices: [
      { who: "Breeding female", line: "If I were an African wild dog, I would not raise this litter alone. The pack is the parent." },
      { who: "Helper", line: "I hunt and I bring meat back. I did not sire these pups. I am why they survive." },
    ],
    zoologistLock: [
      "Not every adult breeds each season.",
      "Do not call the pack a throuple.",
      "Regurgitation is care, shown as food passed at the den.",
    ],
    theatre: {
      kind: "theatre",
      status: "beat-motion",
      poster: place("african-wild-dog", "theatre"),
      src: film("african-wild-dog", "theatre"),
      titleCard: "If I were a wild dog",
      line: "One pair has the pups. The rest of the pack hunts and feeds them.",
    },
    clay: {
      kind: "clay",
      status: "beat-motion",
      poster: place("african-wild-dog", "clay"),
      src: film("african-wild-dog", "clay"),
      loopSilent: loop("african-wild-dog"),
      titleCard: "Helpers at the den",
      line: "Meat comes back to the den. Helpers are why the litter counts.",
    },
  },
  {
    speciesSlug: "elkhorn-coral",
    strategySlug: "broadcast-spawning",
    status: "beat-motion",
    defaultReel: "clay",
    flagship: true,
    caption: CAPTION,
    durationSec: 60,
    hasAudio: true,
    beats: [
      { id: "place", line: "A reef. Colonies wait for nights after a full moon, when the water is right." },
      { id: "signal", line: "Neighboring colonies release on the same night so the water fills at once." },
      { id: "choice", line: "Tiny egg-and-sperm bundles float up. They look like beads, not bodies. The current mixes them." },
      { id: "note", line: "There is no pair. Timing is how they meet. We show beads in water, then we stop." },
    ],
    voices: [
      { who: "One colony", line: "If I were elkhorn coral, I would not pair up. I would wait for the same night as my neighbors." },
      { who: "The reef", line: "We release beads into the current together. That is how the next reef gets started." },
    ],
    zoologistLock: [
      "Beads in water; nights after full moon; outcrossing.",
      "Not a coral sex scene.",
      "Colonies are hermaphroditic.",
    ],
    theatre: {
      kind: "theatre",
      status: "beat-motion",
      poster: place("elkhorn-coral", "theatre"),
      src: film("elkhorn-coral", "theatre"),
      titleCard: "If I were coral",
      line: "We all release on the same night. Beads mix in the current. There is no pair.",
    },
    clay: {
      kind: "clay",
      status: "beat-motion",
      poster: place("elkhorn-coral", "clay"),
      src: film("elkhorn-coral", "clay"),
      loopSilent: loop("elkhorn-coral"),
      titleCard: "Beads in the water",
      line: "Timing is the meeting. The current carries the next generation.",
    },
  },
  {
    speciesSlug: "ocellaris-clownfish",
    strategySlug: "sequential-hermaphroditism",
    status: "beat-motion",
    defaultReel: "clay",
    flagship: true,
    caption: CAPTION,
    durationSec: 60,
    hasAudio: true,
    beats: [
      { id: "place", line: "A family lives in one anemone, lined up by size." },
      { id: "signal", line: "The biggest fish is the female. The next-biggest is the breeding male. The rest are smaller non-breeding males." },
      { id: "choice", line: "If the female dies, the breeding male becomes female. The next-largest male becomes the breeding male." },
      { id: "note", line: "Sex here is a job the body takes when the job opens. It takes months. It is not a costume change, and it is not about people." },
    ],
    voices: [
      { who: "Female", line: "If I were a clownfish, I would be the largest in this anemone. That is why I am female." },
      { who: "Breeding male", line: "I am next in line. If she is gone, my body becomes female. The next male steps up." },
    ],
    zoologistLock: [
      "Protandry: male to female, not the reverse.",
      "No human gender or dating analog.",
      "Vacancy in the size hierarchy drives the switch.",
    ],
    theatre: {
      kind: "theatre",
      status: "beat-motion",
      poster: place("ocellaris-clownfish", "theatre"),
      src: film("ocellaris-clownfish", "theatre"),
      titleCard: "If I were a clownfish",
      line: "Biggest is female. Next is male. If she is gone, he becomes female. The queue moves.",
    },
    clay: {
      kind: "clay",
      status: "beat-motion",
      poster: place("ocellaris-clownfish", "clay"),
      src: film("ocellaris-clownfish", "clay"),
      loopSilent: loop("ocellaris-clownfish"),
      titleCard: "Size is the queue",
      line: "When the top job opens, the next body takes it. Months and hormones, not a costume.",
    },
  },
];

/** Clay-first plates for the rest of the 54. Poster + Ken Burns loop when present. */
const REST_CLAY: { slug: string; strategy: StrategySlug; title: string; line: string }[] = [
  { slug: "indian-peafowl", strategy: "lekking", title: "The train is an ad", line: "He shivers the train to get chosen. He does not sit the nest." },
  { slug: "greater-bird-of-paradise", strategy: "lekking", title: "Plumes in one tree", line: "Males display in a canopy lek. She chooses, then she leaves to nest alone." },
  { slug: "hammer-headed-bat", strategy: "lekking", title: "Honking over the river", line: "Males call in a line. Females fly the line and pick. Pairing is brief." },
  { slug: "uganda-kob", strategy: "lekking", title: "Tiny territories, one arena", line: "She walks a cluster of tiny male territories. Calves hide in grass, not on the lek." },
  { slug: "ruff", strategy: "lekking", title: "Three kinds of male", line: "Some males hold courts, some sneak, some mimic females. None of them incubate." },
  { slug: "prairie-vole", strategy: "pair-bonding", title: "A shared nest", line: "Two adults share a nest and a range. That is a working pair, not a model for people." },
  { slug: "siamang", strategy: "pair-bonding", title: "A morning duet", line: "The pair sings together. The song holds the territory and tells neighbors to stay out." },
  { slug: "mute-swan", strategy: "pair-bonding", title: "A stretch of water, two birds", line: "Both parents tend the young. The pair also holds the territory." },
  { slug: "bald-eagle", strategy: "pair-bonding", title: "A nest used for years", line: "One to three eggs. Both hunt once the chicks hatch." },
  { slug: "french-angelfish", strategy: "pair-bonding", title: "A reef pair on patrol", line: "They swim and spawn as a pair. The social unit is two." },
  { slug: "burying-beetle", strategy: "mate-guarding", title: "A carcass is the nest", line: "Whoever holds the dead animal holds the brood. Rivals get pushed off." },
  { slug: "yellow-dung-fly", strategy: "mate-guarding", title: "Guard the dung", line: "He stays until she lays. Then the window closes." },
  { slug: "hamadryas-baboon", strategy: "mate-guarding", title: "One male, a small unit", line: "He keeps females close. If another male takes over, the next infants may change." },
  { slug: "smooth-newt", strategy: "mate-guarding", title: "A tail fan in still water", line: "He stays after he drops a sperm packet so she does not pick up a rival’s instead." },
  { slug: "three-spined-stickleback", strategy: "mate-guarding", title: "He builds and he stays", line: "He fans the eggs. Guarding the nest is guarding the clutch." },
  { slug: "bluegill", strategy: "sneaker-males", title: "Nests, and the males who rush them", line: "A parental male fans the nest. Smaller males dash in and fertilize some of the eggs." },
  { slug: "giant-cuttlefish", strategy: "sneaker-males", title: "A male who looks like a female", line: "He mimics a female, slips past the big male, and mates. Not a fair fight — a disguise." },
  { slug: "side-blotched-lizard", strategy: "sneaker-males", title: "Yellow throats wait", line: "Three colors, three tactics. Sneakers move in when the owner is busy." },
  { slug: "southern-elephant-seal", strategy: "sneaker-males", title: "Beachmasters and the edge", line: "Huge males fight for the beach. Smaller males skip the fight and try the edge." },
  { slug: "plainfin-midshipman", strategy: "sneaker-males", title: "One hums, one slips in", line: "The nest holder sings and guards. A quieter male slips in and still fertilizes eggs." },
  { slug: "new-mexico-whiptail", strategy: "parthenogenesis", title: "An all-female species", line: "Daughters hatch without sperm. There are no males in this species." },
  { slug: "amazon-molly", strategy: "parthenogenesis", title: "Sperm as a switch", line: "She still needs a male’s sperm as a cue, but the genome of the baby stays hers." },
  { slug: "marbled-crayfish", strategy: "parthenogenesis", title: "One animal can start a population", line: "There is no mating. A single individual can found a population." },
  { slug: "laboratory-stick-insect", strategy: "parthenogenesis", title: "Eggs that skip males", line: "Unfertilized eggs hatch into daughters." },
  { slug: "bonnethead-shark", strategy: "parthenogenesis", title: "A rare backup", line: "Wild sharks still pair. Parthenogenesis is the spare option when no male is there." },
  { slug: "red-necked-phalarope", strategy: "polyandry", title: "He incubates", line: "She may leave a clutch with him and court a second male. He sits the eggs." },
  { slug: "gulf-pipefish", strategy: "polyandry", title: "Pouch space is the limit", line: "She puts eggs in his pouch. He broods them." },
  { slug: "dunnock", strategy: "polyandry", title: "Every combination on one lawn", line: "Pairs, two males, two females — care is negotiated after mating, not a punch line." },
  { slug: "western-honey-bee", strategy: "polyandry", title: "One queen, many drones", line: "She mates on the wing, then stores sperm for years." },
  { slug: "saddleback-tamarin", strategy: "polyandry", title: "Males who carry twins", line: "Twins are heavy. More than one male stays to carry them." },
  { slug: "meerkat", strategy: "cooperative-breeding", title: "A bench of helpers", line: "A dominant pair has most of the pups. Helpers babysit and feed." },
  { slug: "florida-scrub-jay", strategy: "cooperative-breeding", title: "Last year’s young stay", line: "They feed a nest they did not father, waiting for a territory to open." },
  { slug: "superb-fairy-wren", strategy: "cooperative-breeding", title: "Helpers at a mixed nest", line: "A social pair plus helpers. Relatedness in the nest is mixed." },
  { slug: "naked-mole-rat", strategy: "cooperative-breeding", title: "A mammal with a queen", line: "One breeding female. Workers keep the tunnels and the pups." },
  { slug: "acorn-woodpecker", strategy: "cooperative-breeding", title: "A granary held by a group", line: "The tree is a shared store, not one pair’s house." },
  { slug: "purple-sea-urchin", strategy: "broadcast-spawning", title: "Eggs and sperm in the kelp", line: "No pair. They release into the water. Chemistry and numbers do the rest." },
  { slug: "moon-jellyfish", strategy: "broadcast-spawning", title: "A medusa, not a pair", line: "Sperm into the sea. The stage is seasonal. There is no nest." },
  { slug: "pacific-oyster", strategy: "broadcast-spawning", title: "The same warm tide", line: "Millions of eggs. The young settle later, somewhere else." },
  { slug: "atlantic-cod", strategy: "broadcast-spawning", title: "A gathering, not a nest", line: "Eggs drift. Adults do not care for them." },
  { slug: "giant-clam", strategy: "broadcast-spawning", title: "Neighbors on the same cue", line: "Sperm first, then eggs. The current is where they meet." },
  { slug: "bluehead-wrasse", strategy: "sequential-hermaphroditism", title: "When the big male is gone", line: "A large female can become the next male. The vacancy changes the body." },
  { slug: "kobudai", strategy: "sequential-hermaphroditism", title: "A slow change on the reef", line: "Hormones and months, not a costume swap." },
  { slug: "common-slipper-limpet", strategy: "sequential-hermaphroditism", title: "Sex depends on the stack", line: "The one on top is male. The ones below become female as they grow." },
  { slug: "black-sea-bass", strategy: "sequential-hermaphroditism", title: "Most begin female", line: "They change with size and with who else is around." },
  { slug: "stoplight-parrotfish", strategy: "sequential-hermaphroditism", title: "Color tracks the job", line: "A large female may become the next terminal male. Color follows the job." },
];

function restPlay(row: (typeof REST_CLAY)[number]): RitualPlay {
  const poster = clayStill(row.slug);
  const ken = `/media/ritual/loops/${row.slug}-clay.mp4`;
  return {
    speciesSlug: row.slug,
    strategySlug: row.strategy,
    status: "motion-loop",
    defaultReel: "clay",
    flagship: false,
    caption: CAPTION,
    durationSec: 10,
    beats: [{ id: "place", line: row.line }],
    zoologistLock: ["Illustrated clay plate — not field footage."],
    clay: {
      kind: "clay",
      status: "motion-loop",
      poster,
      loopSilent: ken,
      src: ken,
      titleCard: row.title,
      line: row.line,
    },
  };
}

export const PLAYS: RitualPlay[] = [...FLAGSHIPS, ...REST_CLAY.map(restPlay)];

export const playBySlug: Record<string, RitualPlay> = Object.fromEntries(
  PLAYS.map((p) => [p.speciesSlug, p]),
);

export function playForSpecies(slug: string): RitualPlay | undefined {
  return playBySlug[slug];
}

export function flagshipForStrategy(slug: StrategySlug): RitualPlay | undefined {
  return playBySlug[FLAGSHIP_BY_STRATEGY[slug]];
}

export function hasReadyReel(play: RitualPlay | undefined): boolean {
  if (!play) return false;
  return play.status === "beat-motion" || play.status === "motion-loop" || play.status === "place-still";
}

export const BEAT_LABEL: Record<string, string> = {
  title: "Who",
  place: "Where",
  signal: "What you see",
  choice: "What happens",
  outcome: "How it ends",
  note: "Remember this",
};
