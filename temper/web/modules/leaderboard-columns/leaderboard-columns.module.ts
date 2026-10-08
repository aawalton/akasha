import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const leaderboardColumns = {
  id: "01a0641f-8bf0-70c1-8e2d-7c74730de40d",
  type: "page-type/module",
  slug: "leaderboard-columns",
  definition: "the columns a companion leaderboard shows",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A column's short label and description are web phrase pages.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A column's full name is the title of the metric page it shows.",
    },
  ],
  createdAt: "2026-09-02T21:56:24.176Z",
  updatedAt: "2026-09-27T11:48:08.000Z",
} as const satisfies Module
