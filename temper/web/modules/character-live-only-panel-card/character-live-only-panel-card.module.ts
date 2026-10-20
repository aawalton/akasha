import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const characterLiveOnlyPanelCard = {
  id: "01a0642c-5b8c-7103-bb20-3b45d03008e8",
  type: "page-type/module",
  slug: "character-live-only-panel-card",
  definition: "a panel card for a character with only a live build or only a target",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Its wording is read from web phrase pages.",
    },
  ],
  createdAt: "2026-09-02T22:10:23.756Z",
  updatedAt: "2026-10-20T11:22:26.482Z",
} as const satisfies Module
