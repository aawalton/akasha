import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const stolenFilter = {
  id: "01a06100-3bff-7782-8d27-8df8dd457040",
  pageTypeSlug: "module",
  slug: "stolen-filter",
  definition: "the Stolen Status condition a rule may carry, as the rule editor offers it",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "This filter reads and writes the `stolen` condition alone.",
    },
    {
      invariantKind: "departure",
      statement:
        "A category under the two roots named in the code is offered no Stolen Status condition.",
    },
    {
      invariantKind: "departure",
      statement: "A rule carrying the `crafted` condition is offered no Stolen Status condition.",
    },
  ],
} as const satisfies Module
