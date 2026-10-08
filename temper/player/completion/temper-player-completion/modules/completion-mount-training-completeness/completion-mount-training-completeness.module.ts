import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const completionMountTrainingCompleteness = {
  id: "01a06108-2ff3-7f44-b36b-b96b671954b0",
  type: "page-type/module",
  slug: "completion-mount-training-completeness",
  definition: "whether a character has trained a mount to its limit",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "One of the three mount statistics is asked after by naming that statistic.",
    },
  ],
  createdAt: "2026-09-02T07:32:01.651Z",
  updatedAt: "2026-09-21T15:58:08.000Z",
} as const satisfies Module
