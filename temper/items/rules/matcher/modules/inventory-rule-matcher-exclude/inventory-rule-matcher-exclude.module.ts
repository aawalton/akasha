import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inventoryRuleMatcherExclude = {
  id: "01a06151-370c-715e-8bd1-7789e3ac3132",
  type: "page-type/module",
  slug: "inventory-rule-matcher-exclude",
  definition: "which matched items are set aside, and which already lie where the rule sends them",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Where a rule sends an item is read off that rule's action and destination.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An item already at its destination is marked rather than moved.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An affected item carries the item, where it lies, and whether it is there.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A container the rule's action cannot open is set aside.",
    },
  ],
  createdAt: "2026-09-02T08:51:47.596Z",
  updatedAt: "2026-09-21T15:36:01.000Z",
} as const satisfies Module
