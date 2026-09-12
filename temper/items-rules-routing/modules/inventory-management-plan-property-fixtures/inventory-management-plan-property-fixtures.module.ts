import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const inventoryManagementPlanPropertyFixtures = {
  id: "01a06289-2676-74b4-91ec-0643ccf4bba1",
  type: "module",
  slug: "inventory-management-plan-property-fixtures",
  definition: "the generated holdings and rules the plan's property tests are built from",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A scenario puts every affected item on the same character's backpack.",
    },
    {
      invariantKind: "departure",
      statement: "A capacity scenario fills the bank to a stated number of free slots.",
    },
  ],
} as const satisfies Module
