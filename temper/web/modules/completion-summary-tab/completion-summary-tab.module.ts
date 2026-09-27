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
} as const satisfies Module
