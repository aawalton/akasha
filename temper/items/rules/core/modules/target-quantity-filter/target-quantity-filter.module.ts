import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const targetQuantityFilter = {
  id: "01a06100-3c00-7f25-8688-74ce5d924b58",
  type: "page-type/module",
  slug: "target-quantity-filter",
  definition: "the Target condition a rule may carry, as the rule editor offers it",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "This filter reads and writes the `targetQuantity` condition alone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A rule with the `keep-quantity` condition is offered no Target condition.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A rule whose action is other than `move-to` is offered no Target condition.",
    },
  ],
} as const satisfies Module
