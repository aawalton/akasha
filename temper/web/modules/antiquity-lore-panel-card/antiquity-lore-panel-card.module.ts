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
  createdAt: "2026-09-02T21:59:02.731Z",
  updatedAt: "2026-09-27T11:31:19.000Z",
} as const satisfies Module
