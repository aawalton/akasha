import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const completionDailyWritsProgress = {
  id: "01a06121-f0d3-7abe-8cbd-d58213576940",
  type: "module",
  slug: "completion-daily-writs-progress",
  definition: "how many of today's seven daily writs each character has turned in",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The count shown is the count of today alone.",
    },
  ],
} as const satisfies Module
