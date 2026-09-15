import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const searchValueFilter = {
  id: "01a0613a-e0b2-7f07-844d-be1021d78a93",
  type: "page-type/module",
  slug: "search-value-filter",
  definition: "the item value, narrowed by a range from 0 to 1000000 with a comparison operator",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here narrows the server request.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The operator defaults to <= where the saved value names no operator.",
    },
  ],
} as const satisfies Module
