import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const ruleCardFilterChipsItemSelectionChips = {
  id: "01a0636c-5da1-75f5-b2d5-4a3d65bd0052",
  type: "page-type/module",
  slug: "rule-card-filter-chips-item-selection-chips",
  definition: "the item chips a reader chooses from a list",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The location chips are named from the location type and bag pages.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A chip's prompt, count and heading are rule card phrases or its filter's title.",
    },
  ],
} as const satisfies Module
