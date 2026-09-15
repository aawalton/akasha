import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const traitsFilter = {
  id: "01a0615c-1e11-7b74-a805-3a2271d63ffb",
  type: "module",
  slug: "traits-filter",
  definition: "the Traits condition a rule may carry, as the rule editor offers it",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "This filter reads and writes the `traits` condition alone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The traits offered are the traits the item family named by the category can have.",
    },
  ],
} as const satisfies Module
