import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const inventoryManagementPlanGrouping = {
  id: "01a0615a-a1db-77c0-bfca-77236df241ac",
  pageTypeSlug: "module",
  slug: "inventory-management-plan-grouping",
  definition: "the plan's items gathered into groups by the action taken on them",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A group's total is the sum of the item values the group holds.",
    },
    {
      invariantKind: "departure",
      statement: "An item carrying no value leaves the group total unknown.",
    },
  ],
} as const satisfies Module
