import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const ruleConditionStates = {
  id: "01a06100-3bf9-7682-bcf3-5d2d1cfaaa2c",
  type: "page-type/module",
  slug: "rule-condition-states",
  definition:
    "which conditions each category tree node ends up under, given the rules over that tree",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A node takes the conditions of the first rule matching the node.",
    },
  ],
  createdAt: "2026-09-02T07:23:20.441Z",
  updatedAt: "2026-09-21T15:44:44.000Z",
} as const satisfies Module
