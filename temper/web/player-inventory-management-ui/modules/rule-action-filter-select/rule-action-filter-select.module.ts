import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const ruleActionFilterSelect = {
  id: "01a0636c-5d9b-78f5-a696-1e40eeec003b",
  type: "page-type/module",
  slug: "rule-action-filter-select",
  definition: "the select narrowing rules by the action they take",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Action and sell destination labels are read from item action and venue pages.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The all-actions and any-destination choices are worded by web phrase pages.",
    },
  ],
} as const satisfies Module
