import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const stolenFilter = {
  id: "01a06100-3bff-7782-8d27-8df8dd457040",
  type: "page-type/module",
  slug: "stolen-filter",
  definition: "the `stolen` condition a rule may carry, as the rule editor offers it",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "This filter reads and writes the `stolen` condition alone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A category under the two roots named in the code is offered no `stolen` condition.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A rule with the `crafted` condition is offered no `stolen` condition.",
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
  createdAt: "2026-09-02T07:23:20.447Z",
  updatedAt: "2026-09-27T10:46:36.000Z",
} as const satisfies Module
