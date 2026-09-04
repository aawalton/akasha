import type { Module } from "@akasha/code-system/module"

export const catalogCollectAdapters = {
  id: "01a063ba-94e5-7a59-9efa-ef08d6f1dfea",
  pageTypeSlug: "module",
  slug: "catalog-collect-adapters",
  definition: "what the collection run calls to reach the game, the clock and the saved table",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A collector is called inside the game's protected call so a fault is caught.",
    },
    {
      invariantKind: "departure",
      statement: "A fault that is no text is reported under one fixed sentence.",
    },
    {
      invariantKind: "departure",
      statement: "A run leaving no skips clears the skips rather than leaving the old ones.",
    },
  ],
} as const satisfies Module
