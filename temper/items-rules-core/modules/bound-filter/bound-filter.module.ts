import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const boundFilter = {
  id: "01a06100-3be2-7f00-99b6-1c954caa2761",
  type: "module",
  slug: "bound-filter",
  definition: "the Bound Status condition a rule may carry, as the rule editor offers it",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "This filter reads and writes the `bound` condition alone.",
    },
  ],
} as const satisfies Module
