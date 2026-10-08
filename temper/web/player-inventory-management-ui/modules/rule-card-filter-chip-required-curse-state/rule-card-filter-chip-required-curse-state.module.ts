import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const ruleCardFilterChipRequiredCurseState = {
  id: "01a0636c-5da1-7fca-80f0-d8012b5d004b",
  type: "page-type/module",
  slug: "rule-card-filter-chip-required-curse-state",
  definition: "the chip narrowing a rule by an item's curse",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A curse is labelled by its curse page's title.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The chip's remove label is the remove-filter phrase.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The chip's prompt and heading are rule card phrases.",
    },
  ],
  createdAt: "2026-09-02T18:40:41.377Z",
  updatedAt: "2026-09-27T11:47:20.000Z",
} as const satisfies Module
