import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const itemRuleCard = {
  id: "01a0636c-5d9b-7cbf-bead-3c2c118c0030",
  type: "page-type/module",
  slug: "item-rule-card",
  definition: "the card for editing an item rule",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Action and sell destination labels are read from item action and venue pages.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The destination toggle is worded by rule card phrases.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The destination toggle's aria-label is a rule card phrase.",
    },
  ],
} as const satisfies Module
