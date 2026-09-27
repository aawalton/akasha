import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const ruleCardFilterChipPotionEffects = {
  id: "01a0636c-5da1-7b4f-885a-0989f745004a",
  type: "page-type/module",
  slug: "rule-card-filter-chip-potion-effects",
  definition: "the chip narrowing a rule by what a potion does",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The chip's remove label is the remove-filter phrase.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The modes are condition value pages, and the chip's other words are rule card phrases.",
    },
  ],
} as const satisfies Module
