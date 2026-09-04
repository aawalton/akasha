import type { Module } from "@akasha/code-system/module"

export const dataminingItemMiner = {
  id: "01a06341-d9e8-7004-990d-d242df0e2bd1",
  pageTypeSlug: "module",
  slug: "datamining-item-miner",
  definition: "what the game says about every item, taken one item id at a time",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Item ids are mined in batches rather than in one run.",
    },
    {
      invariantKind: "departure",
      statement: "A batch hands the game back to the player before the next batch starts.",
    },
    {
      invariantKind: "departure",
      statement: "An item id the game names nothing for is counted as a miss.",
    },
    {
      invariantKind: "departure",
      statement: "Mining that has run past the stated misses is complete.",
    },
    {
      invariantKind: "departure",
      statement: "Completed item mining starts quest mining.",
    },
    {
      invariantKind: "departure",
      statement: "Mining resumes from the last id rather than from the first.",
    },
    {
      invariantKind: "departure",
      statement: "A generation count makes stopped mining drop its own queued batch.",
    },
  ],
} as const satisfies Module
