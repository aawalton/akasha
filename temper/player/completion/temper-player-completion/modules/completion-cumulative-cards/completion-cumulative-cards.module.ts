import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const completionCumulativeCards = {
  id: "01a06108-2fee-74d3-95b3-542ec82718a6",
  type: "page-type/module",
  slug: "completion-cumulative-cards",
  definition: "the account and character cards that count for all time",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here counts the completions a character has earned.",
    },
  ],
  createdAt: "2026-09-02T07:32:01.646Z",
  updatedAt: "2026-09-21T15:58:08.000Z",
} as const satisfies Module
