import type { ChangeGenerator } from "akasha/change/generator/change-generator.page-type.types.ts"

export const raceIdsKeeping = {
  id: "01a0e08d-6075-7fce-8b3e-5d7804281be8",
  type: "page-type/change-generator",
  slug: "race-ids-keeping",
  definition: "the type naming every race by its id, written again from the race pages",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The type is written by a machine from the race pages rather than by an author.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A race's id is its page's slug.",
    },
  ],
} as const satisfies ChangeGenerator
