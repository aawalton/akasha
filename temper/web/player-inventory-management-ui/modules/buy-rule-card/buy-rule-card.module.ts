import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const buyRuleCard = {
  id: "01a0636c-5d97-72db-98d0-8c886c670005",
  type: "page-type/module",
  slug: "buy-rule-card",
  definition: "the card for editing a buy rule",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The active and lock toggles are worded by rule card phrases.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The menu, delete dialog and title are rule card phrases; the merchant is a venue page.",
    },
  ],
} as const satisfies Module
