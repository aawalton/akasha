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
  ],
} as const satisfies Module
