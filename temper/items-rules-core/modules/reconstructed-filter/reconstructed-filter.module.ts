import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const reconstructedFilter = {
  id: "01a06100-3bf7-7546-86af-79fe6f2c3a83",
  type: "page-type/module",
  slug: "reconstructed-filter",
  definition: "the Reconstructed Status condition a rule may carry, as the rule editor offers it",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "This filter reads and writes the `reconstructed` condition alone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A category outside `equipment` is offered no Reconstructed Status condition.",
    },
  ],
} as const satisfies Module
