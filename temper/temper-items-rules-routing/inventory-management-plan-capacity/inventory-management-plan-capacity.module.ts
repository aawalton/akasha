import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const inventoryManagementPlanCapacity = {
  id: "01a0615a-a1da-7c31-ab71-f3b4228cff88",
  pageTypeSlug: "module",
  slug: "inventory-management-plan-capacity",
  definition: "how many free slots each place holds and which stacks merge into each other",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Two stacks of one item merge only where the game lets that item stack.",
    },
    {
      invariantKind: "departure",
      statement: "A place absent from the captured holdings holds no free slots.",
    },
  ],
} as const satisfies Module
