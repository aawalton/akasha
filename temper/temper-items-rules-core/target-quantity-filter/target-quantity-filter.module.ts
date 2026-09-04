import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const targetQuantityFilter = {
  id: "01a06100-3c00-7f25-8688-74ce5d924b58",
  pageTypeSlug: "module",
  slug: "target-quantity-filter",
  definition: "the Target condition a rule may carry, as the rule editor offers it",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "This filter reads and writes the `targetQuantity` condition alone.",
    },
    {
      invariantKind: "departure",
      statement: "A rule carrying the `keep-quantity` condition is offered no Target condition.",
    },
    {
      invariantKind: "departure",
      statement: "A rule whose action is other than `move-to` is offered no Target condition.",
    },
  ],
} as const satisfies Module
