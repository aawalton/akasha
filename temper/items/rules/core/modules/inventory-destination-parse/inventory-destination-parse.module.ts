import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inventoryDestinationParse = {
  id: "01a06100-3bec-7b79-9779-2c42248a315d",
  type: "page-type/module",
  slug: "inventory-destination-parse",
  definition: "an action name or a destination read out of the text a saved rule holds",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Text naming no known action reads as nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Text naming no known destination reads as nothing.",
    },
  ],
  createdAt: "2026-09-02T07:23:20.428Z",
  updatedAt: "2026-09-21T15:44:44.000Z",
} as const satisfies Module
