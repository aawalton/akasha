import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const ruleCardFilterChipsItemThresholdChips = {
  id: "01a0636c-5da1-7ffb-be04-07ac7a7b0054",
  type: "page-type/module",
  slug: "rule-card-filter-chips-item-threshold-chips",
  definition: "the item chips setting a threshold",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A level option is spelled by the rule card phrase its key names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A chip's remove label is the remove-filter phrase.",
    },
  ],
} as const satisfies Module
