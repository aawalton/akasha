import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const ruleCardFilterChipCanLevelMorphs = {
  id: "01a0636c-5da1-795e-85c1-29e384530049",
  type: "page-type/module",
  slug: "rule-card-filter-chip-can-level-morphs",
  definition: "the chip narrowing a rule to items that level a morph",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The chip's remove label is the remove-filter phrase.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The chip is named by its condition field page, and its note is a web phrase.",
    },
  ],
  createdAt: "2026-09-02T18:40:41.377Z",
  updatedAt: "2026-09-27T11:45:01.000Z",
} as const satisfies Module
