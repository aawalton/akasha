import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const checkItemIds = {
  id: "01a0deca-ab8d-70e8-8f2e-dae37d4dd19d",
  type: "page-type/module",
  slug: "check-item-ids",
  definition: "the condition check over the item ids a rule lists against the item's own id",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An item matches only where its id is one the rule lists.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A rule stating one id bare rather than a list is named rather than tested.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The order of the list is not tested here; a stock rule reads it as priority.",
    },
  ],
} as const satisfies Module
