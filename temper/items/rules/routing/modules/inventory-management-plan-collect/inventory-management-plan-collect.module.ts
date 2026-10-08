import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inventoryManagementPlanCollect = {
  id: "01a0615a-a1db-7228-98a9-6c297cc5bc0d",
  type: "page-type/module",
  slug: "inventory-management-plan-collect",
  definition: "every step of a whole session taken from the rules and the captured holdings",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A step is gathered only where the rule's items still need moving.",
    },
  ],
  createdAt: "2026-09-02T09:02:04.763Z",
  updatedAt: "2026-09-22T14:24:39.000Z",
} as const satisfies Module
