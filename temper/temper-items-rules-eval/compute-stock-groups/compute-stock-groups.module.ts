import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const computeStockGroups = {
  id: "01a06137-f969-7f2a-b975-82f7a16eb18d",
  pageTypeSlug: "module",
  slug: "compute-stock-groups",
  definition: "the set of item ids each stocking rule matches, gathered under that rule's id",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Only rules carrying allStocked or targetQuantity get a stock group.",
    },
    {
      invariantKind: "departure",
      statement: "Stock conditions are skipped while the stock groups are being computed.",
    },
    {
      invariantKind: "departure",
      statement: "A rule matching no item is left out of the returned map.",
    },
    {
      invariantKind: "constraint",
      statement: "A rule without an id cannot key a stock group.",
    },
  ],
} as const satisfies Module
