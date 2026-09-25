import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const formatTimeAgo = {
  id: "01a06432-b190-70c7-9a7e-6b7554e6dccf",
  type: "page-type/module",
  slug: "format-time-ago",
  definition: "an instant written as a phrase saying how long ago it was",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/absence",
      statement: "No instant is written as no words rather than as a phrase.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An instant that is no date is written as no words rather than as the epoch.",
    },
  ],
} as const satisfies Module
