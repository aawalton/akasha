import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inventoryManagementPlanHousePlacement = {
  id: "01a1840d-db19-7db6-b978-5b8e16dbe15b",
  type: "page-type/module",
  slug: "inventory-management-plan-house-placement",
  definition:
    "the house each furnishing a plan moves is placed in, chosen by the room each house has",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A rule whose chain names a house sends each furnishing to one leg of that chain.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A furnishing goes to the first house in the chain with room for its whole stack.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Single items and small stacks go to the houses first, the smallest stack first.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The largest stacks stay in the vault, where a stack of any size takes one slot.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A furnishing no house takes goes to the chain's first leg that is no house.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A house with no known room takes nothing and is named as a house to scan first.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A furnishing placed in a house is no item in a bag, so no rule moves it out.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A stack leaving the vault for a house frees one vault slot.",
    },
  ],
  createdAt: "2026-10-28T19:47:43.000Z",
  updatedAt: "2026-10-28T19:47:43.000Z",
} as const satisfies Module
