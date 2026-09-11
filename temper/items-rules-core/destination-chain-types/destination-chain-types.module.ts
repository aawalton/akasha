import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const destinationChainTypes = {
  id: "01a06100-3beb-7cbe-8efb-ecf0935f3720",
  type: "module",
  slug: "destination-chain-types",
  definition: "the shape of one tier in a chain of destinations an item cascades down",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A tier names where the items go and how many items the tier takes.",
    },
  ],
} as const satisfies Module
