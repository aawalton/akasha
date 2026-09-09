import type { Domain } from "../../domains/domain.page-type.ts"

export const temperQuestsTrace = {
  id: "01a06098-98a2-7c25-8f77-066842973eb3",
  pageTypeSlug: "domain",
  type: "domain",
  slug: "temper-quests-trace",
  definition: "what the quest addon decided, read back from what the addon saved",
  parts: ["module/auto-quest-trace"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A trace is read here outside the game rather than inside the game.",
    },
    {
      invariantKind: "absence",
      statement: "No game function is called here.",
    },
  ],
} as const satisfies Domain
