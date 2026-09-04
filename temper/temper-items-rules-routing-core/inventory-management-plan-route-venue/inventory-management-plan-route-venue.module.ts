import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const inventoryManagementPlanRouteVenue = {
  id: "01a06151-370a-75d2-9f60-78f57041397a",
  pageTypeSlug: "module",
  slug: "inventory-management-plan-route-venue",
  definition: "the places a plan visits, in the order a player goes round them",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "A venue's place in this list is the order the venues are visited in.",
    },
    {
      invariantKind: "gap",
      statement: "A venue moved to another place sends the player round in a different order.",
    },
    {
      invariantKind: "departure",
      statement: "A location the player cannot reach has no venue.",
    },
  ],
} as const satisfies Module
