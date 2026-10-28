import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inventoryRuleMatcherTypes = {
  id: "01a06100-3bef-716e-8a17-b2edb1a2dc74",
  type: "page-type/module",
  slug: "inventory-rule-matcher-types",
  definition: "the shape of an item a rule was found to affect, and of the map from rule to items",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An affected item carries where the item lies as well as the item's own data.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An item already at the destination is marked rather than dropped.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An affected item carries the leg of its rule's chain the plan chose, where one chose.",
    },
  ],
  createdAt: "2026-09-02T07:23:20.431Z",
  updatedAt: "2026-10-28T19:47:43.000Z",
} as const satisfies Module
