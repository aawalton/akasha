import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const inventoryRuleGoals = {
  id: "01a060d9-44ca-7d5d-bec0-67931a83447a",
  pageTypeSlug: "module",
  slug: "inventory-rule-goals",
  definition:
    "the goals a rule may be worked toward, each with the priority the goal is weighed at",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Each goal carries the priority the goal is weighed at.",
    },
    {
      invariantKind: "departure",
      statement: "A rule pursuing no goal is stored against the goal id GOAL_NONE_ID.",
    },
  ],
} as const satisfies Module
