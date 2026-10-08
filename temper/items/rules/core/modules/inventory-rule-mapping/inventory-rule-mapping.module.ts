import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inventoryRuleMapping = {
  id: "01a0615c-1e0f-7d27-ab92-82119f712c91",
  type: "page-type/module",
  slug: "inventory-rule-mapping",
  definition: "the game addon's inventory settings written out from the saved rules",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A setting the rules leave unsaid keeps the value the settings already have.",
    },
  ],
  createdAt: "2026-09-02T09:03:42.095Z",
  updatedAt: "2026-09-21T15:44:44.000Z",
} as const satisfies Module
