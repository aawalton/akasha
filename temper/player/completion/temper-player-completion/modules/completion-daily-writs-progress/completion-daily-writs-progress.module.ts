import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const completionDailyWritsProgress = {
  id: "01a06121-f0d3-7abe-8cbd-d58213576940",
  type: "page-type/module",
  slug: "completion-daily-writs-progress",
  definition: "how many of today's seven daily writs each character has finished",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The count shown is the count of today alone.",
    },
  ],
} as const satisfies Module
