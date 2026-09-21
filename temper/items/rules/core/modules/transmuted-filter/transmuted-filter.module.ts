import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const transmutedFilter = {
  id: "01a06100-3c00-7289-bd55-ca10e321d94e",
  type: "page-type/module",
  slug: "transmuted-filter",
  definition: "the Transmuted Status condition a rule may carry, as the rule editor offers it",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "This filter reads and writes the `transmuted` condition alone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A category outside `equipment` is offered no Transmuted Status condition.",
    },
  ],
} as const satisfies Module
