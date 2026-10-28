import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inventoryManagementPlanRouteVenue = {
  id: "01a06151-370a-75d2-9f60-78f57041397a",
  type: "page-type/module",
  slug: "inventory-management-plan-route-venue",
  definition: "the places a plan visits, in the order a player goes round them",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "A venue's place in this list is the order the venues are visited in.",
    },

    {
      decisionKind: "decision-kind/departure",
      statement: "A location the player cannot reach has no venue.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A soul gem is filled in the field, so filling is planned from the backpack.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A plan's step words are plan phrase pages, their held titles first.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An item bound for a house is placed in that house, a stop named for the house.",
    },
  ],
  createdAt: "2026-09-02T08:51:47.594Z",
  updatedAt: "2026-10-28T19:42:44.161Z",
} as const satisfies Module
