import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const searchItemNameFilter = {
  id: "01a0613a-e0a8-75a5-b44f-e3ccf7935549",
  type: "page-type/module",
  slug: "search-item-name-filter",
  definition: "the item name, narrowed by a text pattern typed into the filter bar",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A blank or whitespace-only pattern matches every item.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "Pattern matching is delegated to itemNameMatchesPattern in game-items-core.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here narrows the server request.",
    },
  ],
} as const satisfies Module
