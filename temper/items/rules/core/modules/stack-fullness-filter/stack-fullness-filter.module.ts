import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const stackFullnessFilter = {
  id: "01a06100-3bfd-71eb-8e28-95fa17ca5dfc",
  type: "page-type/module",
  slug: "stack-fullness-filter",
  definition: "the `stackFullness` condition a rule may carry, as the rule editor offers it",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "This filter reads and writes the `stackFullness` condition alone.",
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
  createdAt: "2026-09-02T07:23:20.445Z",
  updatedAt: "2026-09-27T10:46:36.000Z",
} as const satisfies Module
