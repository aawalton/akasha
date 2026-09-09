import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const searchItemNameFilter = {
  id: "01a0613a-e0a8-75a5-b44f-e3ccf7935549",
  pageTypeSlug: "module",
  slug: "search-item-name-filter",
  definition: "the item name, narrowed by a text pattern typed into the filter bar",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A blank or whitespace-only pattern matches every item.",
    },
    {
      invariantKind: "constraint",
      statement: "Pattern matching is delegated to itemNameMatchesPattern in game-items-core.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here narrows the server request.",
    },
  ],
} as const satisfies Module
