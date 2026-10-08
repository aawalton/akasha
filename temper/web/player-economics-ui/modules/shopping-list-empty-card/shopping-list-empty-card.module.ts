import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const shoppingListEmptyCard = {
  id: "01a0e2a8-fbc3-7adb-af1c-5d3efab1dcda",
  type: "page-type/module",
  slug: "shopping-list-empty-card",
  definition: "the card shown where a player's shopping list holds nothing",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The card's wording is read from a phrase page rather than written in its code.",
    },
  ],
  createdAt: "2026-09-27T11:38:40.451Z",
  updatedAt: "2026-09-27T11:38:49.000Z",
} as const satisfies Module
