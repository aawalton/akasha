import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const merchantValueFilter = {
  id: "01a06100-3bf3-7c82-ba13-ae472675dcf6",
  pageTypeSlug: "module",
  slug: "merchant-value-filter",
  definition: "the Merchant Value condition a rule may carry, as the rule editor offers it",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "This filter reads and writes the conditions `merchantValue` and `merchantValueOp`.",
    },
  ],
} as const satisfies Module
