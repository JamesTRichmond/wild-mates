import { type StrategySlug } from "./strategies";

export type BodyPlan =
  | "bird"
  | "mammal"
  | "fish"
  | "reptile"
  | "amphibian"
  | "insect"
  | "marine";

export type Biome = "grassland" | "forest" | "desert" | "freshwater" | "marine" | "sky" | "island" | "urban-edge";

export type Species = {
  slug: string;
  name: string;
  latin: string;
  tagline: string;
  strategy: StrategySlug;
  habitat: string;
  biome: Biome;
  diet: string;
  lifespan: string;
  status: string;
  region: string;
  body: BodyPlan;
  summary: string;
  ritual: string;
};

export const SPECIES: Species[] = [
  {
    slug: "sage-grouse",
    name: "Greater sage-grouse",
    latin: "Centrocercus urophasianus",
    tagline: "Males display at dawn. Females choose, then nest alone.",
    strategy: "lekking",
    habitat: "Sagebrush steppe",
    biome: "grassland",
    diet: "Sagebrush, forbs, insects",
    lifespan: "3–6 years typical",
    status: "Near Threatened",
    region: "Western North America",
    body: "bird",
    summary:
      "A large grouse of open sagebrush. Males inflate yellow air sacs and fan spiked tails on traditional leks; most fertilizations go to a handful of adults.",
    ritual:
      "Before sunrise, males strut, pop air sacs, and hold positions. Females walk the arena, watch, and leave. Males do not incubate.",
  },
  {
    slug: "indian-peafowl",
    name: "Indian peafowl",
    latin: "Pavo cristatus",
    tagline: "A train that is a signal, not a shelter.",
    strategy: "lekking",
    habitat: "Forest edge and farmland",
    biome: "forest",
    diet: "Seeds, insects, small vertebrates",
    lifespan: "10–25 years",
    status: "Least Concern",
    region: "South Asia; widely introduced",
    body: "bird",
    summary:
      "Males gather in loose display groups. The train’s iridescence and shiver are assessed by females; the ornament is costly to grow and to carry.",
    ritual:
      "A male fans the train, rattles the feathers, and orients the ocelli toward a visiting hen. After pairing he provides no nest care.",
  },
  {
    slug: "greater-bird-of-paradise",
    name: "Greater bird-of-paradise",
    latin: "Paradisaea apoda",
    tagline: "Canopy leks of yellow plumes.",
    strategy: "lekking",
    habitat: "Lowland rainforest canopy",
    biome: "forest",
    diet: "Fruit and arthropods",
    lifespan: "Unknown in wild; long-lived in care",
    status: "Least Concern",
    region: "New Guinea",
    body: "bird",
    summary:
      "Males occupy traditional canopy courts. Plumes, inverted postures, and calls are the advertisement. Females raise the clutch alone.",
    ritual:
      "Several males may display in one tree. A female inspects, then leaves with a single chosen partner for a brief copulation and a solo nest.",
  },
  {
    slug: "hammer-headed-bat",
    name: "Hammer-headed bat",
    latin: "Hypsignathus monstrosus",
    tagline: "A honking lek over African rivers.",
    strategy: "lekking",
    habitat: "Lowland forest and riverine swamp",
    biome: "forest",
    diet: "Fruit, especially figs",
    lifespan: "About 10 years estimated",
    status: "Least Concern",
    region: "Equatorial Africa",
    body: "mammal",
    summary:
      "Males with enlarged larynxes gather along watercourses and honk in chorus. Females fly the line of callers and choose.",
    ritual:
      "Night leks last hours. A female approaches a calling male; pairing is brief. There is no male care of the single young.",
  },
  {
    slug: "uganda-kob",
    name: "Uganda kob",
    latin: "Kobus kob thomasi",
    tagline: "Territories packed into an arena.",
    strategy: "lekking",
    habitat: "Floodplain grassland",
    biome: "grassland",
    diet: "Grasses",
    lifespan: "10–15 years",
    status: "Least Concern",
    region: "East Africa",
    body: "mammal",
    summary:
      "Males hold tiny clustered territories on a lek. Females move through the cluster; central males usually gain more matings than edge males.",
    ritual:
      "A female enters a territory, assesses the holder, and may move on. No pair bond follows. Calves hide in grass, not at the lek.",
  },
  {
    slug: "ruff",
    name: "Ruff",
    latin: "Calidris pugnax",
    tagline: "Three male morphs on one lek.",
    strategy: "lekking",
    habitat: "Arctic and temperate wetlands",
    biome: "grassland",
    diet: "Invertebrates, seeds",
    lifespan: "About 5–10 years",
    status: "Least Concern",
    region: "Eurasian breeding; African wintering",
    body: "bird",
    summary:
      "Independent dark-ruffed males, white satellite males, and rare female-mimic faeders share leks. Genetics of the morphs is a famous inversion.",
    ritual:
      "Independents fight for courts. Satellites loiter and intercept. Females visit and leave; males do not incubate.",
  },
  {
    slug: "wandering-albatross",
    name: "Wandering albatross",
    latin: "Diomedea exulans",
    tagline: "They dance, they keep one egg, they take turns on the nest.",
    strategy: "pair-bonding",
    habitat: "Southern Ocean islands and pelagic waters",
    biome: "island",
    diet: "Squid, fish, carrion",
    lifespan: "50+ years",
    status: "Vulnerable",
    region: "Southern Ocean",
    body: "bird",
    summary:
      "Socially monogamous pairs reunite at natal islands, share incubation of a single egg, and skip years between chicks because the young take so long to fledge.",
    ritual:
      "Sky-pointing, bill-clapping, and coordinated dances form and maintain the pair. Extra-pair events are rare relative to many passerines.",
  },
  {
    slug: "prairie-vole",
    name: "Prairie vole",
    latin: "Microtus ochrogaster",
    tagline: "A mammal that often shares a nest.",
    strategy: "pair-bonding",
    habitat: "Tallgrass and mixed prairie",
    biome: "grassland",
    diet: "Grasses and forbs",
    lifespan: "1–2 years in the wild",
    status: "Least Concern",
    region: "Central North America",
    body: "mammal",
    summary:
      "Pairs often share a nest and care for pups. Neuroendocrine work on this species made it a model for social attachment — not a template for human relationships.",
    ritual:
      "After mating, many pairs remain together and exclude strangers from the nest. Alternative tactics exist; the species is not uniformly monogamous.",
  },
  {
    slug: "siamang",
    name: "Siamang",
    latin: "Symphalangus syndactylus",
    tagline: "Duets that map a territory.",
    strategy: "pair-bonding",
    habitat: "Hill and montane rainforest",
    biome: "forest",
    diet: "Fruit, leaves, flowers",
    lifespan: "25–40 years",
    status: "Endangered",
    region: "Malay Peninsula and Sumatra",
    body: "mammal",
    summary:
      "Adults typically live as a pair with offspring. Loud inflated-sac calls advertise the group. Extra-group mating is documented but the social unit is the pair.",
    ritual:
      "Morning duets coordinate the pair and warn neighbors. Infants are carried by both sexes as they grow.",
  },
  {
    slug: "mute-swan",
    name: "Mute swan",
    latin: "Cygnus olor",
    tagline: "Territory held by two.",
    strategy: "pair-bonding",
    habitat: "Lakes, slow rivers, coasts",
    biome: "freshwater",
    diet: "Aquatic plants, algae",
    lifespan: "10–20 years wild",
    status: "Least Concern",
    region: "Eurasia; introduced elsewhere",
    body: "bird",
    summary:
      "Pairs defend a stretch of water and raise cygnets together. Bonds often persist across years if both survive.",
    ritual:
      "Head-turning and mirrored swimming accompany pair formation. Both adults tend the brood; males are notably aggressive to intruders.",
  },
  {
    slug: "bald-eagle",
    name: "Bald eagle",
    latin: "Haliaeetus leucocephalus",
    tagline: "A nest reused for years.",
    strategy: "pair-bonding",
    habitat: "Coasts, lakes, large rivers",
    biome: "forest",
    diet: "Fish, waterbirds, carrion",
    lifespan: "15–25 years wild",
    status: "Least Concern",
    region: "North America",
    body: "bird",
    summary:
      "A breeding pair holds a nest territory, shares incubation, and feeds nestlings for months. Pairs often reunite at the same nest.",
    ritual:
      "Cartwheeling flight and nest-building maintain the pair. One to three eggs; both adults hunt once chicks hatch.",
  },
  {
    slug: "french-angelfish",
    name: "French angelfish",
    latin: "Pomacanthus paru",
    tagline: "A reef pair that patrols as a unit.",
    strategy: "pair-bonding",
    habitat: "Coral and rocky reefs",
    biome: "marine",
    diet: "Sponges, algae, invertebrates",
    lifespan: "10+ years",
    status: "Least Concern",
    region: "Western Atlantic",
    body: "fish",
    summary:
      "Adults are typically found as stable pairs that share a feeding range. Pair spawning is the usual pattern on the reef.",
    ritual:
      "Pairs rise in the water column to release gametes together. The social unit is the pair, not a harem.",
  },
  {
    slug: "emperor-dragonfly",
    name: "Emperor dragonfly",
    latin: "Anax imperator",
    tagline: "He holds on so another male cannot take his place.",
    strategy: "mate-guarding",
    habitat: "Still waters, canals, ponds",
    biome: "freshwater",
    diet: "Flying insects",
    lifespan: "Adults weeks; nymphs up to 2 years",
    status: "Least Concern",
    region: "Africa, Europe, western Asia",
    body: "insect",
    summary:
      "After coupling, the male often stays attached or hovers while the female oviposits, reducing takeover by other males.",
    ritual:
      "The male grasps the female’s head with claspers. Contact or non-contact guarding through egg-laying is the point: this clutch, not the next pond.",
  },
  {
    slug: "burying-beetle",
    name: "Burying beetle",
    latin: "Nicrophorus vespilloides",
    tagline: "A carcass, a pair, a fight with rivals.",
    strategy: "mate-guarding",
    habitat: "Woodland soil",
    biome: "forest",
    diet: "Small vertebrate carcasses; larvae fed regurgitant",
    lifespan: "Weeks to months as adults",
    status: "Least Concern",
    region: "Palearctic",
    body: "insect",
    summary:
      "A pair buries a small carcass, shaves it, and rears larvae on it. Intruders are expelled. Care is biparental and fiercely defended.",
    ritual:
      "Whoever finds the carcass first may be joined or displaced. Once a pair holds it, they stay and guard the resource that is the brood.",
  },
  {
    slug: "yellow-dung-fly",
    name: "Yellow dung fly",
    latin: "Scathophaga stercoraria",
    tagline: "Guard the cowpat or lose the clutch.",
    strategy: "mate-guarding",
    habitat: "Livestock pasture",
    biome: "grassland",
    diet: "Adults prey on smaller flies; larvae in dung",
    lifespan: "Weeks as adults",
    status: "Least Concern",
    region: "Holarctic",
    body: "insect",
    summary:
      "Males seize females on fresh dung. Last-male sperm precedence makes post-mating attendance valuable until eggs are laid.",
    ritual:
      "A male remains mounted while the female oviposits. Larger males win takeovers; smaller ones wait on the edge of the pat.",
  },
  {
    slug: "hamadryas-baboon",
    name: "Hamadryas baboon",
    latin: "Papio hamadryas",
    tagline: "One-male units inside a troop.",
    strategy: "mate-guarding",
    habitat: "Semi-desert cliffs and scrub",
    biome: "desert",
    diet: "Grasses, roots, invertebrates",
    lifespan: "20–30 years",
    status: "Least Concern",
    region: "Horn of Africa, southwest Arabia",
    body: "mammal",
    summary:
      "A leader male herds a small group of females and is aggressive to male rivals. Higher-level bands sleep on cliffs.",
    ritual:
      "Herding, neck bites as control, and vigilance keep females in the unit. Takeovers by other males reset who sires the next infants.",
  },
  {
    slug: "smooth-newt",
    name: "Smooth newt",
    latin: "Lissotriton vulgaris",
    tagline: "A tail fan in still water.",
    strategy: "mate-guarding",
    habitat: "Ponds and damp terrestrial cover",
    biome: "freshwater",
    diet: "Invertebrates",
    lifespan: "About 6 years",
    status: "Least Concern",
    region: "Europe and western Asia",
    body: "amphibian",
    summary:
      "Males develop a crest and fan pheromones toward a female, then deposit a spermatophore she may pick up. Rivals interrupt.",
    ritual:
      "After transfer a male may stay near the female through a bout of courtship, reducing the chance a second male’s packet is taken instead.",
  },
  {
    slug: "three-spined-stickleback",
    name: "Three-spined stickleback",
    latin: "Gasterosteus aculeatus",
    tagline: "The nest is the territory.",
    strategy: "mate-guarding",
    habitat: "Coasts, streams, lakes",
    biome: "freshwater",
    diet: "Invertebrates, fish eggs",
    lifespan: "1–3 years",
    status: "Least Concern",
    region: "Northern Hemisphere",
    body: "fish",
    summary:
      "A male builds a plant nest, courts females into it, then guards and fans the eggs. Other males raid.",
    ritual:
      "Zigzag courtship leads a female to the nest. After she lays, he fertilizes and stays. Guarding the nest is guarding the clutch.",
  },
  {
    slug: "coho-salmon",
    name: "Coho salmon",
    latin: "Oncorhynchus kisutch",
    tagline: "Two kinds of males reach the same nest: a fighter and a sneaker.",
    strategy: "sneaker-males",
    habitat: "North Pacific rivers and ocean",
    biome: "freshwater",
    diet: "Invertebrates then fish",
    lifespan: "3 years typical; jacks return earlier",
    status: "Varies by population",
    region: "North Pacific",
    body: "fish",
    summary:
      "Large hooknose males fight for position beside a female on the redd. Smaller jacks dash in at the moment of spawning.",
    ritual:
      "The female digs a gravel nest called a redd. A large hooknose male fights for the spot beside her. A smaller jack — a male who returned after one ocean winter — hides, then darts in when she lays eggs. Both can fertilize the clutch. We stop as eggs settle into gravel.",
  },
  {
    slug: "bluegill",
    name: "Bluegill",
    latin: "Lepomis macrochirus",
    tagline: "Parentals, satellites, sneakers.",
    strategy: "sneaker-males",
    habitat: "Warm lakes and ponds",
    biome: "freshwater",
    diet: "Insects, snails, small fish",
    lifespan: "4–11 years",
    status: "Least Concern",
    region: "North America; widely introduced",
    body: "fish",
    summary:
      "Parental males build colonies of nests. Satellite and sneaker males intercept spawnings. Age and growth set which tactic is open.",
    ritual:
      "A female spawns in a parental nest. A sneaker rushes from cover; a satellite may hover as if it were a female. The parental still fans the eggs — including some he did not sire.",
  },
  {
    slug: "giant-cuttlefish",
    name: "Giant cuttlefish",
    latin: "Sepia apama",
    tagline: "A male who looks like a female.",
    strategy: "sneaker-males",
    habitat: "Temperate reefs and spawning aggregations",
    biome: "marine",
    diet: "Crustaceans and fish",
    lifespan: "1–2 years",
    status: "Near Threatened",
    region: "Southern Australia",
    body: "marine",
    summary:
      "Large males guard females on spawning grounds. Small males flash female color patterns, slip past the guard, and transfer a packet.",
    ritual:
      "The mimic swims as a second ‘female,’ then attempts to mate when the large male is occupied. Success is opportunistic, not a duel.",
  },
  {
    slug: "side-blotched-lizard",
    name: "Side-blotched lizard",
    latin: "Uta stansburiana",
    tagline: "Rock–paper–scissors in throats.",
    strategy: "sneaker-males",
    habitat: "Arid scrub and rocky slopes",
    biome: "desert",
    diet: "Insects",
    lifespan: "Usually 1–2 years",
    status: "Least Concern",
    region: "Western North America",
    body: "reptile",
    summary:
      "Orange-throated males hold large territories, blues guard smaller groups, yellows sneak. Each morph beats one of the others in a cycle.",
    ritual:
      "Yellow-throated males do not defend. They enter orange territories when the owner is busy and mate with unattended females.",
  },
  {
    slug: "southern-elephant-seal",
    name: "Southern elephant seal",
    latin: "Mirounga leonina",
    tagline: "Beachmasters and the ones who wait.",
    strategy: "sneaker-males",
    habitat: "Subantarctic beaches and Southern Ocean",
    biome: "island",
    diet: "Squid and fish",
    lifespan: "Males ~14 years; females longer",
    status: "Least Concern",
    region: "Southern Ocean islands",
    body: "mammal",
    summary:
      "A few huge males control harems. Peripheral males intercept females leaving the water or the edge of the harem.",
    ritual:
      "Beachmasters fight. Smaller males avoid the fight and attempt copulation at the margins — high risk, occasional success.",
  },
  {
    slug: "plainfin-midshipman",
    name: "Plainfin midshipman",
    latin: "Porichthys notatus",
    tagline: "Humming type I, sneaking type II.",
    strategy: "sneaker-males",
    habitat: "Intertidal nests on the Pacific coast",
    biome: "marine",
    diet: "Crustaceans and small fish",
    lifespan: "Several years",
    status: "Least Concern",
    region: "Northeast Pacific",
    body: "fish",
    summary:
      "Type I males excavate nests and hum to attract females. Type II males are small, gonad-heavy, and steal fertilizations in those nests.",
    ritual:
      "A female lays in the type I nest. Type II males slip in and release sperm. The type I male still guards the eggs.",
  },
  {
    slug: "komodo-dragon",
    name: "Komodo dragon",
    latin: "Varanus komodoensis",
    tagline: "If no male shows up, she can still nest. The young are sons, not clones.",
    strategy: "parthenogenesis",
    habitat: "Tropical savanna and monsoon forest",
    biome: "island",
    diet: "Deer, pigs, carrion",
    lifespan: "About 30 years",
    status: "Endangered",
    region: "Lesser Sunda Islands, Indonesia",
    body: "reptile",
    summary:
      "Usually sexual. Isolated females have produced viable clutches without males via facultative parthenogenesis — documented in captivity and relevant to small island populations.",
    ritual:
      "Typical breeding is male combat and courtship. Parthenogenesis is an option, not the default, and yields limited genetic diversity.",
  },
  {
    slug: "new-mexico-whiptail",
    name: "New Mexico whiptail",
    latin: "Aspidoscelis neomexicana",
    tagline: "An all-female hybrid species.",
    strategy: "parthenogenesis",
    habitat: "Desert grassland and scrub",
    biome: "desert",
    diet: "Insects",
    lifespan: "About 3–7 years",
    status: "Least Concern",
    region: "Southwestern United States, northern Mexico",
    body: "reptile",
    summary:
      "A hybrid parthenogen: females produce daughters without sperm. Pseudocopulation between females can stimulate ovulation.",
    ritual:
      "One female may mount another in a courtship-like sequence that raises hormone levels and helps the clutch form. There are no males in the species.",
  },
  {
    slug: "amazon-molly",
    name: "Amazon molly",
    latin: "Poecilia formosa",
    tagline: "Sperm as a switch, not a genome.",
    strategy: "parthenogenesis",
    habitat: "Warm streams and ditches",
    biome: "freshwater",
    diet: "Algae and detritus",
    lifespan: "About 3 years",
    status: "Least Concern",
    region: "Northeast Mexico and southern Texas",
    body: "fish",
    summary:
      "An all-female clonal species that needs sperm from a related molly to trigger embryogenesis (gynogenesis). The offspring are clones of the mother.",
    ritual:
      "Males of sailfin or Atlantic molly species are duped into mating. Their DNA is typically not incorporated; the egg still needs the cue.",
  },
  {
    slug: "marbled-crayfish",
    name: "Marbled crayfish",
    latin: "Procambarus virginalis",
    tagline: "One clone, many waters.",
    strategy: "parthenogenesis",
    habitat: "Still and slow fresh water",
    biome: "freshwater",
    diet: "Detritus, plants, invertebrates",
    lifespan: "2–4 years",
    status: "Invasive outside origin",
    region: "Originated in captivity; wild in several continents",
    body: "marine",
    summary:
      "An all-female triploid crayfish that reproduces by apomictic parthenogenesis. A single individual can found a population — which is why it is a conservation problem where introduced.",
    ritual:
      "There is no mating. Eggs are laid and carried on the abdomen. Every daughter is genetically nearly identical to the mother.",
  },
  {
    slug: "laboratory-stick-insect",
    name: "Indian stick insect",
    latin: "Carausius morosus",
    tagline: "A culture that rarely needs males.",
    strategy: "parthenogenesis",
    habitat: "Shrub layer; widely cultured",
    biome: "forest",
    diet: "Leaves",
    lifespan: "About a year as adult",
    status: "Least Concern / cultured",
    region: "Southern India; global in classrooms",
    body: "insect",
    summary:
      "Obligate or nearly obligate parthenogenesis in lab stocks. Males are scarce. It is a standard example of thelytoky in insects.",
    ritual:
      "Unfertilized eggs hatch into females. Sexual reproduction is possible in related stick insects; this stock mostly skips it.",
  },
  {
    slug: "bonnethead-shark",
    name: "Bonnethead shark",
    latin: "Sphyrna tiburo",
    tagline: "A shark that can skip fathers.",
    strategy: "parthenogenesis",
    habitat: "Shallow bays and estuaries",
    biome: "marine",
    diet: "Crabs and other crustaceans",
    lifespan: "About 12 years",
    status: "Endangered",
    region: "Western Atlantic and eastern Pacific",
    body: "fish",
    summary:
      "Usually sexual. Captive females have given birth without males via automictic parthenogenesis — a documented facultative path, not the common one in the wild.",
    ritual:
      "Wild courtship is still male–female pairing. Parthenogenesis is a rare fallback when sperm storage is exhausted or males are absent.",
  },
  {
    slug: "northern-jacana",
    name: "Northern jacana",
    latin: "Jacana spinosa",
    tagline: "She holds the territory; he sits the nest.",
    strategy: "polyandry",
    habitat: "Marsh with floating vegetation",
    biome: "freshwater",
    diet: "Insects and other invertebrates",
    lifespan: "About 10 years estimated",
    status: "Least Concern",
    region: "Mexico to Panama; Caribbean",
    body: "bird",
    summary:
      "Females are larger and defend territories that contain several males. Each male incubates his own clutch.",
    ritual:
      "A female lays successive clutches with different males on her territory. Sex-role reversal is ecological, not theatrical.",
  },
  {
    slug: "red-necked-phalarope",
    name: "Red-necked phalarope",
    latin: "Phalaropus lobatus",
    tagline: "He incubates. She may leave for another male.",
    strategy: "polyandry",
    habitat: "Arctic ponds; winters at sea",
    biome: "freshwater",
    diet: "Zooplankton and insects",
    lifespan: "About 5 years",
    status: "Least Concern",
    region: "Circumpolar breeding",
    body: "bird",
    summary:
      "Males incubate and brood. Females are brighter and may lay a second clutch with a second male if time allows.",
    ritual:
      "After the first clutch is left with a male, a female may court another. Sequential polyandry, not a group nest.",
  },
  {
    slug: "gulf-pipefish",
    name: "Gulf pipefish",
    latin: "Syngnathus scovelli",
    tagline: "Males brood; females compete.",
    strategy: "polyandry",
    habitat: "Seagrass and estuaries",
    biome: "marine",
    diet: "Tiny crustaceans",
    lifespan: "About 1–2 years",
    status: "Least Concern",
    region: "Gulf of Mexico and nearby Atlantic",
    body: "fish",
    summary:
      "Males carry eggs in a brood pouch. Females can deposit eggs with more than one male; males may receive eggs from more than one female depending on population.",
    ritual:
      "A female transfers eggs to a male’s pouch. The limiting resource is pouch space, so sexual selection often acts more strongly on females.",
  },
  {
    slug: "dunnock",
    name: "Dunnock",
    latin: "Prunella modularis",
    tagline: "Every combination on one lawn.",
    strategy: "polyandry",
    habitat: "Gardens, hedgerows, woodland edge",
    biome: "urban-edge",
    diet: "Insects and seeds",
    lifespan: "About 2–3 years typical",
    status: "Least Concern",
    region: "Eurasia; introduced in New Zealand",
    body: "bird",
    summary:
      "Variable mating system: pairs, polyandry, polygyny, polygynandry. Females often mate with two males who then share chick feeding in proportion to access.",
    ritual:
      "A female solicits multiple males. Males peck at the cloaca before mating — a competition over whose sperm remains. Care is negotiated afterward.",
  },
  {
    slug: "western-honey-bee",
    name: "Western honey bee",
    latin: "Apis mellifera",
    tagline: "One queen, a drone congregation.",
    strategy: "polyandry",
    habitat: "Cavities; agricultural landscapes",
    biome: "forest",
    diet: "Nectar and pollen",
    lifespan: "Queen 2–5 years; workers weeks to months",
    status: "Least Concern (managed)",
    region: "Cosmopolitan",
    body: "insect",
    summary:
      "A queen mates with many drones on nuptial flights and stores sperm for years. Colony genetic diversity helps disease resistance and task allocation.",
    ritual:
      "Drones wait in congregation areas. The queen mates in flight with multiple males, then returns to the hive. Drones die after mating.",
  },
  {
    slug: "saddleback-tamarin",
    name: "Saddleback tamarin",
    latin: "Leontocebus fuscicollis",
    tagline: "Two males often help one female.",
    strategy: "polyandry",
    habitat: "Amazonian forest",
    biome: "forest",
    diet: "Fruit, insects, exudates",
    lifespan: "About 10 years wild",
    status: "Least Concern",
    region: "Western Amazon",
    body: "mammal",
    summary:
      "Groups often include one breeding female and more than one adult male who carry twins. Paternity may be mixed; care is cooperative.",
    ritual:
      "The female mates with resident males. Males invest heavily in carrying infants — the cost that makes polyandry stable.",
  },
  {
    slug: "meerkat",
    name: "Meerkat",
    latin: "Suricata suricatta",
    tagline: "A dominant pair, a bench of helpers.",
    strategy: "cooperative-breeding",
    habitat: "Arid savanna and scrub",
    biome: "desert",
    diet: "Insects, scorpions, small vertebrates",
    lifespan: "5–15 years",
    status: "Least Concern",
    region: "Southern Africa",
    body: "mammal",
    summary:
      "A dominant female and male produce most pups. Subordinates babysit, guard, and feed. Reproduction by helpers is suppressed, not absent.",
    ritual:
      "The dominant pair mates within the group. Helpers gain indirect fitness and a chance at future breeding if they inherit or disperse.",
  },
  {
    slug: "florida-scrub-jay",
    name: "Florida scrub-jay",
    latin: "Aphelocoma coerulescens",
    tagline: "Last year’s young stay to help.",
    strategy: "cooperative-breeding",
    habitat: "Oak scrub",
    biome: "forest",
    diet: "Insects, acorns, small vertebrates",
    lifespan: "About 10–15 years",
    status: "Vulnerable",
    region: "Peninsular Florida",
    body: "bird",
    summary:
      "A breeding pair is often joined by offspring who delay dispersal. Helpers feed nestlings and defend a scarce scrub territory.",
    ritual:
      "The breeding pair remains socially monogamous. Helpers do not typically sire the nest they feed; they wait for a vacancy nearby.",
  },
  {
    slug: "african-wild-dog",
    name: "African wild dog",
    latin: "Lycaon pictus",
    tagline: "One pair has the pups. The rest of the pack helps raise them.",
    strategy: "cooperative-breeding",
    habitat: "Savanna and woodland",
    biome: "grassland",
    diet: "Medium ungulates",
    lifespan: "About 10 years",
    status: "Endangered",
    region: "Sub-Saharan Africa (fragmented)",
    body: "mammal",
    summary:
      "Usually one dominant pair breeds. The pack feeds pups by regurgitation and guards dens. Pack size strongly affects hunting success.",
    ritual:
      "The alpha pair mates. All adults provision. Without helpers, denning often fails — cooperation is demography, not sentiment.",
  },
  {
    slug: "superb-fairy-wren",
    name: "Superb fairy-wren",
    latin: "Malurus cyaneus",
    tagline: "Helpers at the nest, extra-pair sires in the tree.",
    strategy: "cooperative-breeding",
    habitat: "Understory and gardens",
    biome: "urban-edge",
    diet: "Insects",
    lifespan: "About 5 years typical",
    status: "Least Concern",
    region: "Southeastern Australia",
    body: "bird",
    summary:
      "Socially a pair plus helpers. Genetically, extra-pair paternity is extremely high. Helpers still feed nestlings on the home territory.",
    ritual:
      "A female often solicits extra-pair males before dawn. The social male and helpers still raise the brood — relatedness is mixed.",
  },
  {
    slug: "naked-mole-rat",
    name: "Naked mole-rat",
    latin: "Heterocephalus glaber",
    tagline: "A mammal with a queen.",
    strategy: "cooperative-breeding",
    habitat: "Subterranean arid soils",
    biome: "desert",
    diet: "Tubers",
    lifespan: "Decades in captivity",
    status: "Least Concern",
    region: "Horn of Africa",
    body: "mammal",
    summary:
      "Eusocial: one breeding female, one to a few breeding males, many sterile-like workers. Colonies can number dozens to hundreds.",
    ritual:
      "The queen mates with colony males. Workers maintain tunnels and care for pups. Dispersers are a separate morph in some studies.",
  },
  {
    slug: "acorn-woodpecker",
    name: "Acorn woodpecker",
    latin: "Melanerpes formicivorus",
    tagline: "A granary held by a group.",
    strategy: "cooperative-breeding",
    habitat: "Oak woodland",
    biome: "forest",
    diet: "Acorns, insects, sap",
    lifespan: "About 10 years",
    status: "Least Concern",
    region: "Western Americas",
    body: "bird",
    summary:
      "Groups defend a tree drilled as an acorn granary. Several cobreeding males and females may share a nest; nonbreeding helpers join.",
    ritual:
      "Mating is polygynandrous within the group. Shared paternity and maternity make the granary a joint estate, not a pair’s house.",
  },
  {
    slug: "elkhorn-coral",
    name: "Elkhorn coral",
    latin: "Acropora palmata",
    tagline: "Colonies release beads of eggs and sperm on the same night.",
    strategy: "broadcast-spawning",
    habitat: "Shallow Caribbean reefs",
    biome: "marine",
    diet: "Symbiotic algae plus plankton capture",
    lifespan: "Colonies decades",
    status: "Critically Endangered",
    region: "Caribbean",
    body: "marine",
    summary:
      "Colonies release egg-sperm bundles a few nights after the full moon in late summer. Fertilization happens in the surface slick.",
    ritual:
      "No pairing. Synchrony is the strategy: moon, temperature, and neighbors. Hybridization with related acroporids is documented.",
  },
  {
    slug: "purple-sea-urchin",
    name: "Purple sea urchin",
    latin: "Strongylocentrotus purpuratus",
    tagline: "A model of external fertilization.",
    strategy: "broadcast-spawning",
    habitat: "Rocky intertidal and kelp forest",
    biome: "marine",
    diet: "Kelp and algae",
    lifespan: "Decades possible",
    status: "Least Concern (can be ecologically dominant)",
    region: "Northeast Pacific",
    body: "marine",
    summary:
      "Adults shed eggs or sperm into seawater. Chemotaxis and a block to polyspermy are textbook cell biology, not courtship.",
    ritual:
      "Crowding and water motion set fertilization rates. There is no parental care of the planktonic larvae.",
  },
  {
    slug: "moon-jellyfish",
    name: "Moon jellyfish",
    latin: "Aurelia aurita",
    tagline: "Medusae in the water column.",
    strategy: "broadcast-spawning",
    habitat: "Coastal seas worldwide",
    biome: "marine",
    diet: "Zooplankton",
    lifespan: "About a year as medusa",
    status: "Least Concern",
    region: "Cosmopolitan coasts",
    body: "marine",
    summary:
      "Males release sperm; females often brood planulae on oral arms after internal fertilization in this genus — still a broadcast of sperm into the sea.",
    ritual:
      "Sperm are shed into water and drawn into the female’s gastric system. The medusa is not a pair; it is a seasonal stage.",
  },
  {
    slug: "pacific-oyster",
    name: "Pacific oyster",
    latin: "Magallana gigas",
    tagline: "Doused by the same tide.",
    strategy: "broadcast-spawning",
    habitat: "Estuaries and intertidal",
    biome: "marine",
    diet: "Phytoplankton (filter)",
    lifespan: "10–20 years",
    status: "Least Concern / farmed",
    region: "Pacific origin; globally cultured",
    body: "marine",
    summary:
      "Adults release eggs and sperm in warm water. A single female can shed tens of millions of eggs. Settlement is elsewhere, later.",
    ritual:
      "Temperature and crowding trigger mass spawning. No mate choice in the vertebrate sense — chemistry and concentration.",
  },
  {
    slug: "atlantic-cod",
    name: "Atlantic cod",
    latin: "Gadus morhua",
    tagline: "A spawning aggregation, not a nest.",
    strategy: "broadcast-spawning",
    habitat: "Continental shelves",
    biome: "marine",
    diet: "Fish and invertebrates",
    lifespan: "Can exceed 20 years",
    status: "Varies; many stocks depleted",
    region: "North Atlantic",
    body: "fish",
    summary:
      "Schools gather to spawn pelagic eggs. Some courtship and male sound production occur, but eggs are left in the water column.",
    ritual:
      "Males may display and pair briefly in the aggregation; fertilization is still external and the eggs drift. No nest, no care.",
  },
  {
    slug: "giant-clam",
    name: "Giant clam",
    latin: "Tridacna gigas",
    tagline: "Hermaphrodite clouds on the reef.",
    strategy: "broadcast-spawning",
    habitat: "Shallow coral reefs",
    biome: "marine",
    diet: "Photosynthetic symbionts plus filter feeding",
    lifespan: "Decades to a century",
    status: "Vulnerable",
    region: "Indo-Pacific",
    body: "marine",
    summary:
      "Simultaneous hermaphrodites that typically release sperm first, then eggs, reducing self-fertilization. Spawning is often synchronous on a reef.",
    ritual:
      "Neighbors spawn in sequence. Gametes mix in the current. The adult does not brood the veliger larvae.",
  },
  {
    slug: "ocellaris-clownfish",
    name: "Ocellaris clownfish",
    latin: "Amphiprion ocellaris",
    tagline: "Biggest fish is female. If she dies, the next male becomes female.",
    strategy: "sequential-hermaphroditism",
    habitat: "Sea anemones on coral reefs",
    biome: "marine",
    diet: "Algae, zooplankton, leftovers",
    lifespan: "About 10 years wild; longer in care",
    status: "Least Concern",
    region: "Indo-Pacific",
    body: "fish",
    summary:
      "Protandrous: a group lives in one anemone. The largest is female, the next male, the rest juveniles. If the female dies, the male changes sex.",
    ritual:
      "The breeding pair lays eggs on rock beside the anemone; the male tends them. Size hierarchy, not a harem of competing males, sets sex.",
  },
  {
    slug: "bluehead-wrasse",
    name: "Bluehead wrasse",
    latin: "Thalassoma bifasciatum",
    tagline: "When the big male is gone, a female steps up.",
    strategy: "sequential-hermaphroditism",
    habitat: "Caribbean reefs",
    biome: "marine",
    diet: "Zooplankton, small benthic prey, parasites (cleaners)",
    lifespan: "About 3 years",
    status: "Least Concern",
    region: "Western Atlantic",
    body: "fish",
    summary:
      "Protogynous: many start female (or as primary males). The largest female in a social group can become a territorial terminal-phase male within days.",
    ritual:
      "Terminal males spawn in pair rises. Initial-phase males may sneak in aggregations. Sex change follows vacancy at the top.",
  },
  {
    slug: "kobudai",
    name: "Asian sheepshead wrasse",
    latin: "Semicossyphus reticulatus",
    tagline: "A famous, slow sex change.",
    strategy: "sequential-hermaphroditism",
    habitat: "Rocky temperate reefs",
    biome: "marine",
    diet: "Shellfish and crustaceans",
    lifespan: "20+ years",
    status: "Not globally assessed / fished",
    region: "Northwest Pacific",
    body: "fish",
    summary:
      "Protogynous wrasse. Large males develop a heavy head hump. Females that grow large enough may change sex — documented in the wild and in public aquaria.",
    ritual:
      "A dominant male courts females on the reef. The change is hormonal and morphological over months, not a costume swap.",
  },
  {
    slug: "common-slipper-limpet",
    name: "Common slipper limpet",
    latin: "Crepidula fornicata",
    tagline: "Sex depends on the stack.",
    strategy: "sequential-hermaphroditism",
    habitat: "Intertidal and subtidal hard ground",
    biome: "marine",
    diet: "Phytoplankton (filter)",
    lifespan: "Several years",
    status: "Least Concern / invasive in places",
    region: "Northwest Atlantic origin",
    body: "marine",
    summary:
      "Protandrous stacks: small individuals on top are male, larger ones below become female. Position in the chain predicts sex.",
    ritual:
      "Males fertilize females below them in the stack. As they grow and others settle on top, they change to female.",
  },
  {
    slug: "black-sea-bass",
    name: "Black sea bass",
    latin: "Centropristis striata",
    tagline: "Most begin female.",
    strategy: "sequential-hermaphroditism",
    habitat: "Structured coastal bottoms",
    biome: "marine",
    diet: "Crabs, shrimp, small fish",
    lifespan: "About 10–20 years",
    status: "Least Concern (managed fishery)",
    region: "Western Atlantic",
    body: "fish",
    summary:
      "Protogynous grouper-relative. Many fish function first as females, then as males. Size at change responds to fishing and social context.",
    ritual:
      "Spawning aggregations in spring. Removing large males can shift the size at which remaining females change sex.",
  },
  {
    slug: "stoplight-parrotfish",
    name: "Stoplight parrotfish",
    latin: "Sparisoma viride",
    tagline: "Color phases track sex change.",
    strategy: "sequential-hermaphroditism",
    habitat: "Caribbean coral reefs",
    biome: "marine",
    diet: "Algae and coral rock (bioerosion)",
    lifespan: "About 7–9 years",
    status: "Least Concern",
    region: "Western Atlantic reefs",
    body: "fish",
    summary:
      "Initial-phase fish are typically female (some primary males). Terminal-phase males are brightly colored and territorial after protogynous change.",
    ritual:
      "Pair spawning with a terminal male is common; group spawning also occurs. A large initial-phase female may become the next terminal male.",
  },
];

export const speciesBySlug = Object.fromEntries(SPECIES.map((s) => [s.slug, s])) as Record<
  string,
  Species
>;

export function speciesForStrategy(slug: StrategySlug): Species[] {
  return SPECIES.filter((s) => s.strategy === slug);
}

export function speciesOfTheDay(date = new Date()): Species {
  const key = `${date.getUTCFullYear()}-${date.getUTCMonth() + 1}-${date.getUTCDate()}`;
  let h = 2166136261;
  for (let i = 0; i < key.length; i++) {
    h ^= key.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  const idx = Math.abs(h) % SPECIES.length;
  return SPECIES[idx]!;
}
