import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const ruleCardControlledConditions = {
  id: "01a0636c-5d9b-75a6-9606-38540c960042",
  type: "page-type/module",
  slug: "rule-card-controlled-conditions",
  definition: "the conditions a rule card draws from what it is told",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A chip is named by its condition field's page, and none is drawn before.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A negated chip is named by its condition value page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The quality chip's operator is its comparison op page's title.",
    },
  ],
} as const satisfies Module
