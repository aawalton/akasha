import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const overallSummaryPanelCard = {
  id: "01a06421-f74b-7add-bb48-388a4598002f",
  type: "module",
  slug: "overall-summary-panel-card",
  definition: "the account, character and companion scopes as one row apiece, and what they add to",
  code: "tsx",
  test: "tsx",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The items completed over the three scopes are counted on a row of their own.",
    },
    {
      invariantKind: "departure",
      statement: "That count is a tally of things done rather than a percentage.",
    },
    {
      invariantKind: "departure",
      statement: "The row is left off where no scope has anything to count.",
    },
  ],
} as const satisfies Module
