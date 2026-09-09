import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const searchMerchantValueFilter = {
  id: "01a0613a-e0ab-7549-a285-5931f6ce1026",
  pageTypeSlug: "module",
  slug: "search-merchant-value-filter",
  definition:
    "the merchant sale value of an item, narrowed by a range from 0 to 1000000 with an operator",
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
