import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const completionDailyWritsState = {
  id: "01a06253-d28f-7002-a708-b891c6a40ecd",
  type: "page-type/module",
  slug: "completion-daily-writs-state",
  definition: "how far a character has got through a day's crafting writs",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A writ's craft is named by the title of that craft's craft type page.",
    },
  ],
} as const satisfies Module
