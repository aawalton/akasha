import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const computeStockGroups = {
  id: "01a06137-f969-7f2a-b975-82f7a16eb18d",
  type: "page-type/module",
  slug: "compute-stock-groups",
  definition: "the set of item ids each stocking rule matches, filed under that rule's id",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Only rules with allStocked or targetQuantity get a stock group.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Stock conditions are skipped while the stock groups are being computed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A rule matching no item is left out of the returned map.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A rule without an id cannot key a stock group.",
    },
  ],
} as const satisfies Module
