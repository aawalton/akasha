import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inventoryRuleClassify = {
  id: "01a06100-3bec-7153-ba2d-05f05d4385d3",
  type: "page-type/module",
  slug: "inventory-rule-classify",
  definition:
    "whether a rule belongs on a character card, on a companion card or on a category card",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A rule the automation settings control is classed by the id those settings gave.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A rule equipping a companion belongs on a companion card.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A rule matching neither character nor companion belongs on a category card.",
    },
  ],
  createdAt: "2026-09-02T07:23:20.428Z",
  updatedAt: "2026-09-21T15:44:44.000Z",
} as const satisfies Module
