import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const searchLevelFilter = {
  id: "01a0613a-e0aa-710f-896f-f9ee4858ec8c",
  pageTypeSlug: "module",
  slug: "search-level-filter",
  definition: "the item level, narrowed by a range from 1 to 66 carrying a comparison operator",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The level filter also sets a level band on the server request.",
    },
    {
      invariantKind: "departure",
      statement: "The operator defaults to <= where the saved value names no operator.",
    },
    {
      invariantKind: "departure",
      statement: "A level threshold carrying the != operator sets no server band.",
    },
  ],
} as const satisfies Module
