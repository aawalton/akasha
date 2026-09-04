import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const searchValueFilter = {
  id: "01a0613a-e0b2-7f07-844d-be1021d78a93",
  pageTypeSlug: "module",
  slug: "search-value-filter",
  definition:
    "the item value, narrowed by a range from 0 to 1000000 carrying a comparison operator",
  code: "ts",
  invariants: [
    {
      invariantKind: "absence",
      statement: "Nothing here narrows the server request.",
    },
    {
      invariantKind: "departure",
      statement: "The operator defaults to <= where the saved value names no operator.",
    },
  ],
} as const satisfies Module
