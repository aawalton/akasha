import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const overallSummaryPanelCard = {
  id: "01a06421-f74b-7add-bb48-388a4598002f",
  type: "page-type/module",
  slug: "overall-summary-panel-card",
  definition: "the account, character and companion scopes as one row apiece, and what they add to",
  code: "tsx",
  test: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The items completed over the three scopes are counted on a row of their own.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "That count is a tally of things done rather than a percentage.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The row is left off where no scope has anything to count.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Its wording is read from web phrase pages.",
    },
  ],
  createdAt: "2026-09-02T21:59:02.731Z",
  updatedAt: "2026-09-27T11:30:53.000Z",
} as const satisfies Module
