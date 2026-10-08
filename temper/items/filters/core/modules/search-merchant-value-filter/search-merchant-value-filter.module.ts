import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const searchMerchantValueFilter = {
  id: "01a0613a-e0ab-7549-a285-5931f6ce1026",
  type: "page-type/module",
  slug: "search-merchant-value-filter",
  definition:
    "the merchant sale value of an item, narrowed by a range from 0 to 1000000 with an operator",
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
  createdAt: "2026-09-02T08:27:23.691Z",
  updatedAt: "2026-09-21T15:36:37.000Z",
} as const satisfies Module
