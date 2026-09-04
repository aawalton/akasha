import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const inventoryManagementPlanRouteActor = {
  id: "01a06151-3708-76b3-afdf-d8105f89b89d",
  pageTypeSlug: "module",
  slug: "inventory-management-plan-route-actor",
  definition: "the steps one character carries out before the next character takes over",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Every step belongs to the character carrying it out.",
    },
  ],
} as const satisfies Module
