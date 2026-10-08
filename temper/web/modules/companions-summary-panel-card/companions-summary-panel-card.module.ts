import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const companionsSummaryPanelCard = {
  id: "01a06421-f74b-78d4-a5e8-7585a0c50020",
  type: "page-type/module",
  slug: "companions-summary-panel-card",
  definition: "each companion-scope card as one row of count against total",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Its wording is read from web phrase pages.",
    },
  ],
  createdAt: "2026-09-02T21:59:02.731Z",
  updatedAt: "2026-09-27T11:50:28.000Z",
} as const satisfies Module
