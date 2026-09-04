import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const ruleConditionStates = {
  id: "01a06100-3bf9-7682-bcf3-5d2d1cfaaa2c",
  pageTypeSlug: "module",
  slug: "rule-condition-states",
  definition:
    "which conditions each category tree node ends up under, given the rules over that tree",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A node takes the conditions of the first rule matching the node.",
    },
  ],
} as const satisfies Module
