import type { Module } from "@akasha/code-system/module"

export const dataminingQuestMiner = {
  id: "01a06341-d9e8-7005-ac02-69345fb477d3",
  pageTypeSlug: "module",
  slug: "datamining-quest-miner",
  definition: "what the game says about every quest, taken one quest id at a time",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Quest ids are mined in batches rather than in one run.",
    },
    {
      invariantKind: "departure",
      statement: "A quest id the game names nothing for is counted as a miss.",
    },
    {
      invariantKind: "departure",
      statement: "Mining that has run past the stated misses is complete.",
    },
    {
      invariantKind: "departure",
      statement: "A quest carries the name of the zone the quest sits in.",
    },
    {
      invariantKind: "departure",
      statement: "A generation count makes stopped mining drop its own queued batch.",
    },
  ],
} as const satisfies Module
