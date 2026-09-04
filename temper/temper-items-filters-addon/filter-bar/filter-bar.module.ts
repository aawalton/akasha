import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const filterBar = {
  id: "01a0614b-6735-71b0-b1bb-6d698f3b387d",
  pageTypeSlug: "module",
  slug: "filter-bar",
  definition: "the movable panel a player adds filter rows to while the inventory is open",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A filter row is drawn only once the player picks that filter from the add menu.",
    },
    {
      invariantKind: "departure",
      statement: "Removing a row clears the value that row was holding.",
    },
    {
      invariantKind: "departure",
      statement: "A removed row is hidden and reused rather than rebuilt.",
    },
    {
      invariantKind: "departure",
      statement: "The panel hides whenever the inventory scene hides.",
    },
    {
      invariantKind: "departure",
      statement: "The panel reanchors each time the inventory scene shows.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here decides whether an item passes a filter.",
    },
  ],
} as const satisfies Module
