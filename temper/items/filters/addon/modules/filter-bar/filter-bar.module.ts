import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const filterBar = {
  id: "01a0614b-6735-71b0-b1bb-6d698f3b387d",
  type: "page-type/module",
  slug: "filter-bar",
  definition: "the movable panel a player adds filter rows to while the inventory is open",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A filter row is drawn only once the player picks that filter from the add menu.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Removing a row clears the value that row was holding.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A removed row is hidden and reused rather than rebuilt.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The panel hides whenever the inventory scene hides.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The panel reanchors each time the inventory scene shows.",
    },
  ],
} as const satisfies Module
