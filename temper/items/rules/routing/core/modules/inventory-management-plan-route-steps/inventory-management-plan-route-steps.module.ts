import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inventoryManagementPlanRouteSteps = {
  id: "01a06151-3709-7ab7-b5e0-b46be6326c2d",
  type: "page-type/module",
  slug: "inventory-management-plan-route-steps",
  definition: "the steps for handing an item between characters or through shared storage",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The carrier's legs of the hand-offs of one stack out of one place are merged into one leg.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A stackable step takes one backpack slot for each full stack it moves.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An item passing between characters goes through storage each character reaches.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A hand-off deposits before withdrawing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A hand-off out of a place only the carrier reaches opens with the carrier withdrawing there.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The deposit and withdraw notes are plan phrase pages.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A move within one storage venue is one step only where it stays in one store.",
    },
  ],
  createdAt: "2026-09-02T08:51:47.593Z",
  updatedAt: "2026-11-01T20:35:31.611Z",
} as const satisfies Module
