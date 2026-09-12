import type { Domain } from "akasha/domains/domain.page-type.types.ts"

export const temperRaces = {
  id: "01a0608a-c133-7d7f-96d5-f0070cf3a77a",
  type: "domain",
  slug: "temper-races",
  definition: "the playable races an Elder Scrolls Online character is born into",
  parts: ["module/race-icon-url", "module/races"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The race data here is written out from the race pages.",
    },
    {
      invariantKind: "departure",
      statement: "A race is reached by its own id rather than by the race id the game has.",
    },
  ],
} as const satisfies Domain
