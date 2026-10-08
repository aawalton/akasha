import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const charactersSummaryPanelCard = {
  id: "01a06421-f74b-7bee-a003-ba5f19a30017",
  type: "page-type/module",
  slug: "characters-summary-panel-card",
  definition: "each character-scope card as one row of count against total",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Its wording is read from web phrase pages.",
    },
  ],
  createdAt: "2026-09-02T21:59:02.731Z",
  updatedAt: "2026-09-27T11:37:07.000Z",
} as const satisfies Module
