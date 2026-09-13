/** One living ledger. Phase numbers are permanent. HUMAN items never re-enter the agent list. */

export type PhaseStatus = "open" | "closed" | "closed-with-carry";
export type Kind = "AGENT" | "HUMAN";

export const HUMAN_ITEMS = [
  {
    clickId: 1,
    originPhase: 8,
    lastSeenPhase: 8,
    title: "Hallway: sage-grouse",
    time: "90 s",
    href: "/species/sage-grouse",
    how: "Watch the plate muted. One sentence to a stranger who has never heard of a lek. If you cannot, the film is soup.",
    success: "A one-line retell, or a recut note.",
    blockedBy: null as number | null,
    done: false,
  },
  {
    clickId: 2,
    originPhase: 8,
    lastSeenPhase: 8,
    title: "Keep the repo private, or not",
    time: "1 min",
    href: "https://github.com/JamesTRichmond/wild-mates",
    how: "It is private on GitHub now. Public is a choice. Do not make me guess.",
    success: "Private stays, or you say public.",
    blockedBy: null,
    done: false,
  },
  {
    clickId: 3,
    originPhase: 8,
    lastSeenPhase: 8,
    title: "Name the next recut",
    time: "1 min",
    href: null,
    how: "One flagship whose motion does not match the caption. That film, not a new species.",
    success: "One slug.",
    blockedBy: 1,
    done: false,
  },
  {
    clickId: 4,
    originPhase: 8,
    lastSeenPhase: 8,
    title: "Stay in Grok, or clone",
    time: "1 min",
    href: "https://github.com/JamesTRichmond/wild-mates",
    how: "Clay stills still happen here. Code can live on your machine. Pick the desk for the next week.",
    success: "Grok, clone, or both.",
    blockedBy: null,
    done: false,
  },
  {
    clickId: 5,
    originPhase: 8,
    lastSeenPhase: 8,
    title: "Vercel or not",
    time: "1 min",
    href: null,
    how: "GitHub is the store. A public URL is a separate ask. Say yes only if you want a shareable plate tonight.",
    success: "Yes, later, or no.",
    blockedBy: 2,
    done: false,
  },
  {
    clickId: 6,
    originPhase: 8,
    lastSeenPhase: 8,
    title: "Look at the visual diffs once",
    time: "5 min",
    href: "https://github.com/JamesTRichmond/wild-mates/actions",
    how: "If Actions is red, that is font/GPU, not a new product. Do not bless goldens you have not seen.",
    success: "Pass, or recapture in the Playwright image.",
    blockedBy: null,
    done: false,
  },
] as const;

export const phases = [
  { id: 1, name: "Field-guide brief", status: "closed" as PhaseStatus },
  { id: 2, name: "Clay-only player", status: "closed" as PhaseStatus },
  { id: 3, name: "Nine flagships + Identify", status: "closed-with-carry" as PhaseStatus },
  { id: 4, name: "I2V craft", status: "closed-with-carry" as PhaseStatus },
  { id: 5, name: "Catalog UX", status: "closed" as PhaseStatus },
  { id: 6, name: "Pixel diffs", status: "closed" as PhaseStatus },
  { id: 7, name: "GitHub", status: "closed" as PhaseStatus },
  {
    id: 8,
    name: "Hallway films",
    status: "open" as PhaseStatus,
    native: ["One unique 6–15s action per flagship that a stranger can retell from the caption."],
    carried: [
      "Mating-act must match the one-line caption.",
      "Freeze-frame census still beats soup.",
    ],
  },
] as const;

export const currentPhaseId = 8;

export const RUNLOG = [
  "2026-09-13 living-phases + dynamic-clicklist: opened phase 8. Parked clicks 1–6. Carried mating-act + census from 3 and 4. Repo private at JamesTRichmond/wild-mates.",
  "2026-09-13 clicks: 1 not yet. 2 stay private. 4 both (Grok + clone). 6 they will open Actions — two visual runs already green. 3 still waits on 1. 5 now open.",
  "2026-09-13 click 5: no Vercel. Preview stays in this Grok project.",
] as const;
