import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const knownFilter = {
  id: "01a06100-3bf1-7c10-962d-c2163a907de5",
  type: "module",
  slug: "known-filter",
  definition: "the Known Status condition a rule may carry, as the rule editor offers it",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "This filter reads and writes the `known` condition alone.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A category outside the three roots named in the code is offered no Known Status condition.",
    },
  ],
} as const satisfies Module
