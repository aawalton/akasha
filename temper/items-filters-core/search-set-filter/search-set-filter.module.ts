import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const searchSetFilter = {
  id: "01a0613a-e0ae-7974-b12a-1ebb5ce2d7f4",
  pageTypeSlug: "module",
  slug: "search-set-filter",
  definition: "whether an item belongs to a gear set, narrowed by an in-set or not-in-set toggle",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "An item with a set id above zero counts as belonging to a gear set.",
    },
    {
      invariantKind: "absence",
      statement: "No option names an individual gear set.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here narrows the server request.",
    },
  ],
} as const satisfies Module
