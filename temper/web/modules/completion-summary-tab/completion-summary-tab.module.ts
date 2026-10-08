import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const completionSummaryTab = {
  id: "01a06421-f74b-73f5-8edc-d25f08860028",
  type: "page-type/module",
  slug: "completion-summary-tab",
  definition: "the completion page's summary tab and the rollup cards on it",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Its wording is read from web phrase pages.",
    },
  ],
  createdAt: "2026-09-02T21:59:02.731Z",
  updatedAt: "2026-09-27T11:31:17.000Z",
} as const satisfies Module
