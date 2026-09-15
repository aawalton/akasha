import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const searchStolenFilter = {
  id: "01a0613a-e0af-7ce5-8230-7715b4ff868d",
  type: "module",
  slug: "search-stolen-filter",
  definition: "whether an item is stolen, narrowed by an include or exclude toggle",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The stolen filter reads the stolen flag through the rule-editor flags checker.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here narrows the server request.",
    },
  ],
} as const satisfies Module
