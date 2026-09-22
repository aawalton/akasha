import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const ruleTemplateTable = {
  id: "01a06100-3bfd-7c3a-a467-2c2131163905",
  type: "page-type/module",
  slug: "rule-template-table",
  definition: "the 49 rule templates gathered from the two groups with them, in an order",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "This code is written out from the rule-template pages rather than by hand.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A template's place in this table is the order the rules are tried in.",
    },
    {
      decisionKind: "decision-kind/gap",
      statement: "A template moved to another place changes which rule an item matches first.",
    },
  ],
} as const satisfies Module
