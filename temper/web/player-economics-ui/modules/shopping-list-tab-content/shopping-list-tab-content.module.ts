import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const shoppingListTabContent = {
  id: "01a063a1-8cc1-7006-9e30-88a844c05bf5",
  type: "page-type/module",
  slug: "shopping-list-tab-content",
  definition: "a player's shopping list",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The list's piece names are worked out again whenever the trade numbers are read again.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The list's wording is read from phrase pages, and its category names from the tree.",
    },
  ],
} as const satisfies Module
