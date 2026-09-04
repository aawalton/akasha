import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const inventoryManagementPlanCollect = {
  id: "01a0615a-a1db-7228-98a9-6c297cc5bc0d",
  pageTypeSlug: "module",
  slug: "inventory-management-plan-collect",
  definition: "every step of a whole session gathered from the rules and the captured holdings",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A step is gathered only where the rule's items still need moving.",
    },
  ],
} as const satisfies Module
