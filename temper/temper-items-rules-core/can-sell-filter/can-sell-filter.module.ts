import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const canSellFilter = {
  id: "01a06100-3be8-7f83-ba88-c5db0a0a8a2f",
  pageTypeSlug: "module",
  slug: "can-sell-filter",
  definition: "the Can Sell to Merchant condition a rule may carry, as the rule editor offers it",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "This filter reads and writes the `canSell` condition alone.",
    },
    {
      invariantKind: "departure",
      statement:
        "A rule whose action is other than `sell` or `fence-sell` is offered none of this condition.",
    },
  ],
} as const satisfies Module
