import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const lockedFilter = {
  id: "01a06100-3bf2-73c8-8184-8789e0df7124",
  type: "page-type/module",
  slug: "locked-filter",
  definition: "the `locked` condition a rule may carry, as the rule editor offers it",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "This filter reads and writes the `locked` condition alone.",
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
} as const satisfies Module
