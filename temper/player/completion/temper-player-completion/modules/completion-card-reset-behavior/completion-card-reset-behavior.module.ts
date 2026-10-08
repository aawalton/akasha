import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const completionCardResetBehavior = {
  id: "01a06108-2fed-70ac-9ab5-6923a6b5d6c1",
  type: "page-type/module",
  slug: "completion-card-reset-behavior",
  definition: "whether a completion card counts for all time or starts over each day",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/upkeep",
      statement: "Every completion card is named here.",
    },
  ],
  createdAt: "2026-09-02T07:32:01.645Z",
  updatedAt: "2026-09-21T15:58:08.000Z",
} as const satisfies Module
