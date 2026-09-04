import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const searchBopTradeableFilter = {
  id: "01a0613a-e0a5-79e4-a256-cff1d3e55d05",
  pageTypeSlug: "module",
  slug: "search-bop-tradeable-filter",
  definition: "whether a bound item is still tradeable, narrowed by an include or exclude toggle",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The BoP-tradeable filter reads the flag through the rule-editor flags checker.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here narrows the server request.",
    },
  ],
} as const satisfies Module
