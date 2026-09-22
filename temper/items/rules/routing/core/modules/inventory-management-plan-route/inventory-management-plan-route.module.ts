import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inventoryManagementPlanRoute = {
  id: "01a06151-3709-7e05-8784-492a19817f13",
  type: "page-type/module",
  slug: "inventory-management-plan-route",
  definition: "the route an item takes from where the item lies to where a rule sends it",
  code: "ts",
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
  ],
} as const satisfies Module
