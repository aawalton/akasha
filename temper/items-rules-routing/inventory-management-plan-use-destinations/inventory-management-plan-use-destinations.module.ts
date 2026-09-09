import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const inventoryManagementPlanUseDestinations = {
  id: "01a0615a-a1dc-7e87-b2e1-07d627b10bd7",
  pageTypeSlug: "module",
  slug: "inventory-management-plan-use-destinations",
  definition: "which character each stack of a learnable item is handed to across the plan",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A stack is shared out over the characters who do not yet know the item.",
    },
  ],
} as const satisfies Module
