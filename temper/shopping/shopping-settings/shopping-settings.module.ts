import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const shoppingSettings = {
  id: "01a060cf-b0b1-75a2-8041-f9ae780018d3",
  pageTypeSlug: "module",
  type: "module",
  slug: "shopping-settings",
  definition: "what a shopper has settled about a shopping run before the run",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "An item a shopper marked as not available is keyed by the shopping key.",
    },
    {
      invariantKind: "departure",
      statement: "The value against a key is the second the shopper marked the item.",
    },
  ],
} as const satisfies Module
