import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const shoppingSettings = {
  id: "01a060cf-b0b1-75a2-8041-f9ae780018d3",
  type: "page-type/module",
  slug: "shopping-settings",
  definition: "what a shopper has settled about a shopping run before the run",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An item a shopper marked as not available is keyed by the shopping key.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The value against a key is the second the shopper marked the item.",
    },
  ],
  createdAt: "2026-09-02T06:30:19.057Z",
  updatedAt: "2026-09-21T15:10:37.000Z",
} as const satisfies Module
