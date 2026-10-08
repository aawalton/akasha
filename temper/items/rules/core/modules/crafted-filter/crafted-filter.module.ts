import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const craftedFilter = {
  id: "01a06100-3be9-72bb-ae2f-272ecba3d354",
  type: "page-type/module",
  slug: "crafted-filter",
  definition: "the `crafted` condition a rule may carry, as the rule editor offers it",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "This filter reads and writes the `crafted` condition alone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A category outside the 8 roots named in the code is offered no `crafted` condition.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A rule with the `stolen` condition is offered no `crafted` condition.",
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
  createdAt: "2026-09-02T07:23:20.425Z",
  updatedAt: "2026-09-27T10:46:36.000Z",
} as const satisfies Module
