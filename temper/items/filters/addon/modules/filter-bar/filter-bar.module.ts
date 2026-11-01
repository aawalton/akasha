import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const filterBar = {
  id: "01a0614b-6735-71b0-b1bb-6d698f3b387d",
  type: "page-type/module",
  slug: "filter-bar",
  definition: "the panel a player adds filter rows to while the inventory is open",
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
    {
      decisionKind: "decision-kind/departure",
      statement: "The panel sits under the inventory plan, beside the inventory window.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The panel under the plan takes the plan's width.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A panel shown beside named controls shows and hides with those controls.",
    },
  ],
  createdAt: "2026-09-02T08:45:26.709Z",
  updatedAt: "2026-11-01T20:17:12.958Z",
} as const satisfies Module
