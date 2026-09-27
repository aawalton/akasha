import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const ruleCardHeaderRow = {
  id: "01a0636c-5da1-7a5f-8508-d6c7fd6e0059",
  type: "page-type/module",
  slug: "rule-card-header-row",
  definition: "the row for naming and locking a rule card",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The row's placeholder, labels and reorder menu are rule card phrases.",
    },
  ],
} as const satisfies Module
