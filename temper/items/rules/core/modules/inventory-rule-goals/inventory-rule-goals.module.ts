import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inventoryRuleGoals = {
  id: "01a060d9-44ca-7d5d-bec0-67931a83447a",
  type: "page-type/module",
  slug: "inventory-rule-goals",
  definition: "the goals a rule may be worked toward, each with its own priority",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Each goal has the priority the goal is weighed at.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A rule pursuing no goal is stored against the goal id GOAL_NONE_ID.",
    },
  ],
} as const satisfies Module
