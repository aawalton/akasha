import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inventoryRuleMatcherAllocators = {
  id: "01a06151-370c-7272-8296-63a93f40a850",
  type: "page-type/module",
  slug: "inventory-rule-matcher-allocators",
  definition: "how many of a matched item a rule takes, and what bears the charge",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An allocation is charged against the character the allocation is meant for.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A character keeps the stock that character already holds.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A rule takes no larger amount of an item than the rule asked for.",
    },
  ],
} as const satisfies Module
