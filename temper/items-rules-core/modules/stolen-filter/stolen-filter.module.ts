import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const stolenFilter = {
  id: "01a06100-3bff-7782-8d27-8df8dd457040",
  type: "module",
  slug: "stolen-filter",
  definition: "the Stolen Status condition a rule may carry, as the rule editor offers it",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "This filter reads and writes the `stolen` condition alone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A category under the two roots named in the code is offered no Stolen Status condition.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A rule with the `crafted` condition is offered no Stolen Status condition.",
    },
  ],
} as const satisfies Module
