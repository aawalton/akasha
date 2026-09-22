import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const ruleFilterTypes = {
  id: "01a06100-3bf9-77a0-a8e9-669771a20507",
  type: "page-type/module",
  slug: "rule-filter-types",
  definition: "the shape of a condition a rule may carry, as the rule editor offers and clears it",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Every condition the editor offers is named once in this list of ids.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A filter names the categories the condition suits.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A filter's fingerprint tells two rules carrying that condition apart.",
    },
  ],
} as const satisfies Module
