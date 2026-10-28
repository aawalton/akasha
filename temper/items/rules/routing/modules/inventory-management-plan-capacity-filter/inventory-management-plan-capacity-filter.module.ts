import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inventoryManagementPlanCapacityFilter = {
  id: "01a0615a-a1d8-791c-8a78-ea5520c12370",
  type: "page-type/module",
  slug: "inventory-management-plan-capacity-filter",
  definition: "the items a plan drops because the destination has no room, said with the reason",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An item dropped for want of room is recorded against the rule sending the item.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An audit names the items dropped as well as the items kept.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An item joining a stack already at the destination takes no slot.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A slot an item leaves on the plan is room for an item the plan stores there.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A rule whose chain names a house has each item's leg chosen by the house placement.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A house rule's item bound for a storage leg is kept only where that storage has room.",
    },
  ],
  createdAt: "2026-09-02T09:02:04.760Z",
  updatedAt: "2026-10-28T19:47:43.000Z",
} as const satisfies Module
