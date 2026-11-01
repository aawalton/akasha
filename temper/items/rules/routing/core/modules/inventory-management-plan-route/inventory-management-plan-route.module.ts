import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inventoryManagementPlanRoute = {
  id: "01a06151-3709-7e05-8784-492a19817f13",
  type: "page-type/module",
  slug: "inventory-management-plan-route",
  definition: "the route an item takes from where the item lies to where a rule sends it",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A route is worked out from where the item lies and from where the rule sends that item.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An item already where the rule sends that item needs no route.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A routed item keeps the stack size its holding reads.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An item leaving shared storage for another storage is carried by the storage carrier.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An item taken from storage to a venue goes to the first character the reading lists.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Every item leaving house storage, the vault or a guild bank is withdrawn by the carrier.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The carrier banks such an item for another character, who withdraws it there.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An item leaving one house chest for another is withdrawn at the one and stored at the other.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A destination naming a character sends the item to that character instead.",
    },
  ],
  createdAt: "2026-09-02T08:51:47.593Z",
  updatedAt: "2026-11-01T19:51:40.077Z",
} as const satisfies Module
