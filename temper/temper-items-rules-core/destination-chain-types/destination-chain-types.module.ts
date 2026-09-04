import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const destinationChainTypes = {
  id: "01a06100-3beb-7cbe-8efb-ecf0935f3720",
  pageTypeSlug: "module",
  slug: "destination-chain-types",
  definition: "the shape of one tier in a chain of destinations an item cascades down",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A tier names where the items go and how many the tier takes.",
    },
  ],
} as const satisfies Module
