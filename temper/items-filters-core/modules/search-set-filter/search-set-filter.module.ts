import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const searchSetFilter = {
  id: "01a0613a-e0ae-7974-b12a-1ebb5ce2d7f4",
  type: "module",
  slug: "search-set-filter",
  definition: "whether an item belongs to a gear set, narrowed by an in-set or not-in-set toggle",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "An item with a set id above zero counts as belonging to a gear set.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "No option names an individual gear set.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here narrows the server request.",
    },
  ],
} as const satisfies Module
