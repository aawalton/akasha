import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const buyRuleEval = {
  id: "01a060d9-44c8-7b58-864b-b81a0c27cbac",
  type: "page-type/module",
  slug: "buy-rule-eval",
  definition: "how far short of its target quantity each buy rule falls",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A buy rule turned off answers no evaluation.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A shortfall never falls below zero.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An item absent from the totals counts as zero held.",
    },
  ],
} as const satisfies Module
