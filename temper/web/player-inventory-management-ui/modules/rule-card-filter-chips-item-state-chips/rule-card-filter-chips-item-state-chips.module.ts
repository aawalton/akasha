import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const ruleCardFilterChipsItemStateChips = {
  id: "01a0636c-5da1-7abd-a200-7dcc20430053",
  type: "page-type/module",
  slug: "rule-card-filter-chips-item-state-chips",
  definition: "the item chips a reader switches on or off",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A chip's options are its condition field's value pages, and none is drawn before.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A locked chip's reason is a rule card phrase naming its action and filter.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A chip's remove label is the remove-filter phrase.",
    },
  ],
} as const satisfies Module
