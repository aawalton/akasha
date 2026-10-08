import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const destinationChainTypes = {
  id: "01a06100-3beb-7cbe-8efb-ecf0935f3720",
  type: "page-type/module",
  slug: "destination-chain-types",
  definition: "the shape of a tier in a chain of destinations an item cascades down",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A tier names where the items go and how many items the tier takes.",
    },
  ],
  createdAt: "2026-09-02T07:23:20.427Z",
  updatedAt: "2026-09-22T10:18:36.000Z",
} as const satisfies Module
