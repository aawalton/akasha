import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const accountSummaryPanelCard = {
  id: "01a06421-f74b-72e9-b673-edb9198c000a",
  type: "page-type/module",
  slug: "account-summary-panel-card",
  definition: "each account-wide card as one row of count against total",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Its wording is read from web phrase pages.",
    },
  ],
  createdAt: "2026-09-02T21:59:02.731Z",
  updatedAt: "2026-09-27T11:31:52.000Z",
} as const satisfies Module
