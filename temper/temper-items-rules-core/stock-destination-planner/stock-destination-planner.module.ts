import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const stockDestinationPlanner = {
  id: "01a06100-3bfe-70d5-a0ce-6f5cbaf8b7d9",
  pageTypeSlug: "module",
  slug: "stock-destination-planner",
  definition:
    "where a stack of stocked items goes across characters and down a chain of destinations",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A character already holding the target count takes none of the stack.",
    },
    {
      invariantKind: "departure",
      statement: "The surplus cascades down the tiers in the order the chain gives.",
    },
  ],
} as const satisfies Module
