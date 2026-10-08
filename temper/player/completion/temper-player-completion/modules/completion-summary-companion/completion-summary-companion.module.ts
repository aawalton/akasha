import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const completionSummaryCompanion = {
  id: "01a06124-14db-7fde-9ac1-6e23fae35a9d",
  type: "page-type/module",
  slug: "completion-summary-companion",
  definition: "one line per companion card, counting what an account has of what there is",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A caller naming companions is counted on the companions the caller named.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A companion of no known level counts toward no level total.",
    },
  ],
  createdAt: "2026-09-02T08:02:29.723Z",
  updatedAt: "2026-09-21T15:58:08.000Z",
} as const satisfies Module
