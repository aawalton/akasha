import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const searchFilterSet = {
  id: "01a0613a-e0a8-7cbc-ab1f-cfa2b3fa4abb",
  pageTypeSlug: "module",
  slug: "search-filter-set",
  definition: "the conjunction of the active filter values, run against one item's facts",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "An item survives only where every active filter matches.",
    },
    {
      invariantKind: "departure",
      statement:
        "An active value whose filter id is absent from the index is skipped rather than failed.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here narrows the server request.",
    },
  ],
} as const satisfies Module
