import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const searchCraftedFilter = {
  id: "01a0613a-e0a6-7788-9b2c-3aeaec9aea07",
  pageTypeSlug: "module",
  slug: "search-crafted-filter",
  definition: "whether an item was crafted by a player, narrowed by an include or exclude toggle",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The crafted filter reads the crafted flag through the rule-editor flags checker.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here narrows the server request.",
    },
  ],
} as const satisfies Module
