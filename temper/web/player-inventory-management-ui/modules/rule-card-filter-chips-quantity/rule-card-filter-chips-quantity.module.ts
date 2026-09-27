import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const ruleCardFilterChipsQuantity = {
  id: "01a0636c-5da1-7f8e-9497-93ae6a950055",
  type: "page-type/module",
  slug: "rule-card-filter-chips-quantity",
  definition: "the chip narrowing a rule by how many of an item a player has",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A chip names its filter by the condition field page's title.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The stock threshold chip words its counts with rule card phrases.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A chip's remove label is the remove-filter phrase.",
    },
  ],
} as const satisfies Module
