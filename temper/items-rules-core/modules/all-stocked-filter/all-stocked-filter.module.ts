import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const allStockedFilter = {
  id: "01a06100-3be0-7ea8-a8de-32cfd5204303",
  type: "module",
  slug: "all-stocked-filter",
  definition: "the All Stocked condition a rule may carry, as the rule editor offers it",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "This filter reads and writes the `allStocked` condition alone.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A category outside `consumables` is offered no All Stocked condition.",
    },
  ],
} as const satisfies Module
