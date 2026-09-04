import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const inventoryManagementPlanChain = {
  id: "01a0615a-a1da-742b-ae13-b527b4574811",
  pageTypeSlug: "module",
  slug: "inventory-management-plan-chain",
  definition: "one rule's items spread down a chain of destinations, tier by tier",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A tier takes up to the count the tier names.",
    },
    {
      invariantKind: "departure",
      statement: "What one tier leaves over is offered to the tier below.",
    },
    {
      invariantKind: "departure",
      statement: "What the last tier leaves over is threaded on to the next rule.",
    },
  ],
} as const satisfies Module
