import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inventoryRuleEngine = {
  id: "01a06100-3bee-7b0c-8fa1-7837c3bf430b",
  type: "page-type/module",
  slug: "inventory-rule-engine",
  definition: "the action every category tree node resolves to, given the rules and the tree",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A node takes the action of the first rule matching the node.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A rule on a category reaches every node beneath that category.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A node no rule matches resolves to nothing.",
    },
  ],
  createdAt: "2026-09-02T07:23:20.430Z",
  updatedAt: "2026-09-21T15:44:44.000Z",
} as const satisfies Module
