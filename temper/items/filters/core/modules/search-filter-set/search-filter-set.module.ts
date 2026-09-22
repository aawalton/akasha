import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const searchFilterSet = {
  id: "01a0613a-e0a8-7cbc-ab1f-cfa2b3fa4abb",
  type: "page-type/module",
  slug: "search-filter-set",
  definition: "the conjunction of the active filter values, run against an item's facts",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An item survives only where every active filter matches.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An active value whose filter id is absent from the index is skipped rather than failed.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here narrows the server request.",
    },
  ],
} as const satisfies Module
