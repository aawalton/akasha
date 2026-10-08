import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const questRelevantFilter = {
  id: "01a06100-3bf7-7a6c-b39b-787d502ef6cf",
  type: "page-type/module",
  slug: "quest-relevant-filter",
  definition: "the `questRelevant` condition a rule may carry, as the rule editor offers it",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "This filter reads and writes the `questRelevant` condition alone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "This filter is shown under its condition field page's title.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "This filter's options are its condition field's value pages.",
    },
  ],
  createdAt: "2026-09-02T07:23:20.439Z",
  updatedAt: "2026-09-27T10:46:36.000Z",
} as const satisfies Module
