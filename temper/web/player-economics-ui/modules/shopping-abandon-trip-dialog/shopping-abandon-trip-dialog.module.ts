import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const shoppingAbandonTripDialog = {
  id: "01a0e2a8-fbc3-7820-9c5f-79e837e1e920",
  type: "page-type/module",
  slug: "shopping-abandon-trip-dialog",
  definition: "the question asked before a shopping trip under way is cleared",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The dialog's wording is read from phrase pages rather than written in its code.",
    },
  ],
  createdAt: "2026-09-27T11:38:40.451Z",
  updatedAt: "2026-09-27T11:38:49.000Z",
} as const satisfies Module
