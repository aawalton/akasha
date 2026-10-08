import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const consumablesPanelCard = {
  id: "01a0642c-5b7a-7ed1-98a3-03dc8ef27b95",
  type: "page-type/module",
  slug: "consumables-panel-card",
  definition: "a panel card with a character's consumables",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Its wording is read from web phrase pages.",
    },
  ],
  createdAt: "2026-09-02T22:10:23.738Z",
  updatedAt: "2026-09-27T11:34:33.000Z",
} as const satisfies Module
