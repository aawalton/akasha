import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const ruleCardFilterChipItemIds = {
  id: "01a0dece-5017-7174-a964-bbaa92cf078a",
  type: "page-type/module",
  slug: "rule-card-filter-chip-item-ids",
  definition: "the chip naming the items a rule lists, in the order the rule lists them",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The chip names each item and never edits the list.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An item whose name the lookup does not give is shown by its id.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The chip's remove label is the remove-filter phrase.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The chip's wording around the item names is a rule card phrase.",
    },
  ],
} as const satisfies Module
