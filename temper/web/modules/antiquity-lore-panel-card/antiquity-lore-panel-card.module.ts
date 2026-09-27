import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const antiquityLorePanelCard = {
  id: "01a06421-f74b-719d-8e90-1cedaaf2000f",
  type: "page-type/module",
  slug: "antiquity-lore-panel-card",
  definition: "the antiquity lore the account has recovered, by category",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Its title is read from its completion category page.",
    },
  ],
} as const satisfies Module
