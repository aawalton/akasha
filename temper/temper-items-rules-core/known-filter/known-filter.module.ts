import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const knownFilter = {
  id: "01a06100-3bf1-7c10-962d-c2163a907de5",
  pageTypeSlug: "module",
  slug: "known-filter",
  definition: "the Known Status condition a rule may carry, as the rule editor offers it",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "This filter reads and writes the `known` condition alone.",
    },
    {
      invariantKind: "departure",
      statement:
        "A category outside the three roots named in the code is offered no Known Status condition.",
    },
  ],
} as const satisfies Module
