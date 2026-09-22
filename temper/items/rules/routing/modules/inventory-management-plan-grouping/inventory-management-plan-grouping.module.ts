import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inventoryManagementPlanGrouping = {
  id: "01a0615a-a1db-77c0-bfca-77236df241ac",
  type: "page-type/module",
  slug: "inventory-management-plan-grouping",
  definition: "the plan's items put into groups by the action taken on them",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A group's total is the sum of the item values the group has.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An item with no value leaves the group total unknown.",
    },
  ],
} as const satisfies Module
