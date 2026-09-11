import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const searchBoundFilter = {
  id: "01a0613a-e0a6-703c-9056-c44db729cfe5",
  type: "module",
  slug: "search-bound-filter",
  definition: "whether an item is bound to the account, narrowed by an include or exclude toggle",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The bound filter reads the bound flag through the rule-editor flags checker.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here narrows the server request.",
    },
  ],
} as const satisfies Module
