import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const searchStolenFilter = {
  id: "01a0613a-e0af-7ce5-8230-7715b4ff868d",
  pageTypeSlug: "module",
  slug: "search-stolen-filter",
  definition: "whether an item is stolen, narrowed by an include or exclude toggle",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The stolen filter reads the stolen flag through the rule-editor flags checker.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here narrows the server request.",
    },
  ],
} as const satisfies Module
