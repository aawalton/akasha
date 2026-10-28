import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inventoryManagementPlanGrouping = {
  id: "01a0615a-a1db-77c0-bfca-77236df241ac",
  type: "page-type/module",
  slug: "inventory-management-plan-grouping",
  definition: "the plan's items put into groups by the action taken on them",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A group counts the stacks its items take rather than its items or their units.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A merged item takes its units over its stack size, rounded up, in stacks.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An item whose stack size the holdings never read takes one stack.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A group's total is the sum of the item values the group has.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An item with no value leaves the group total unknown.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A group's label is read from the held item action titles, else from the pages.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An item sold at a fence is grouped under the sell action's title.",
    },
  ],
  createdAt: "2026-09-02T09:02:04.763Z",
  updatedAt: "2026-10-28T19:08:00.033Z",
} as const satisfies Module
