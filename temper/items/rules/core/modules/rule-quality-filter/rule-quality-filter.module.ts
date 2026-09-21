import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const ruleQualityFilter = {
  id: "01a06100-3bfc-7312-ae3a-edec601898f5",
  type: "page-type/module",
  slug: "rule-quality-filter",
  definition: "the Quality condition a rule may carry, as the rule editor offers it",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "This filter reads and writes the conditions `maxQuality` and `qualityOp`.",
    },
  ],
} as const satisfies Module
