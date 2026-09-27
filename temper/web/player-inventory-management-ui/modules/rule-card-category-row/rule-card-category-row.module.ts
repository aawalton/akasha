import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const ruleCardCategoryRow = {
  id: "01a0636c-5d9b-7c17-8e2e-28d05d70003e",
  type: "page-type/module",
  slug: "rule-card-category-row",
  definition: "the row for choosing a rule's category",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The all-of option and the select placeholder are rule card phrases.",
    },
  ],
} as const satisfies Module
