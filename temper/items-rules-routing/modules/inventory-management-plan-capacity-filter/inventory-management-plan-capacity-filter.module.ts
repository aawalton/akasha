import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inventoryManagementPlanCapacityFilter = {
  id: "01a0615a-a1d8-791c-8a78-ea5520c12370",
  type: "module",
  slug: "inventory-management-plan-capacity-filter",
  definition: "the items a plan drops because the destination has no room, said with the reason",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "An item dropped for want of room is recorded against the rule sending the item.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An audit names the items dropped as well as the items kept.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An item joining a stack already at the destination takes no slot.",
    },
  ],
} as const satisfies Module
