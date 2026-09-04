import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const inventoryManagementPlanCapacityFilter = {
  id: "01a0615a-a1d8-791c-8a78-ea5520c12370",
  pageTypeSlug: "module",
  slug: "inventory-management-plan-capacity-filter",
  definition: "the items a plan drops because the destination has no room, said with the reason",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "An item dropped for want of room is recorded against the rule sending the item.",
    },
    {
      invariantKind: "departure",
      statement: "An audit says what was dropped as well as what was kept.",
    },
  ],
} as const satisfies Module
