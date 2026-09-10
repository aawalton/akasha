import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const reconstructedFilter = {
  id: "01a06100-3bf7-7546-86af-79fe6f2c3a83",
  pageTypeSlug: "module",
  slug: "reconstructed-filter",
  definition: "the Reconstructed Status condition a rule may carry, as the rule editor offers it",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "This filter reads and writes the `reconstructed` condition alone.",
    },
    {
      invariantKind: "departure",
      statement: "A category outside `equipment` is offered no Reconstructed Status condition.",
    },
  ],
} as const satisfies Module
