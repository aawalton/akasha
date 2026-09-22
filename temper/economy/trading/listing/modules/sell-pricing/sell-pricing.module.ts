import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const sellPricing = {
  id: "01a060c0-0b9f-7135-8c4b-e497247c8a35",
  type: "page-type/module",
  slug: "sell-pricing",
  definition: "what to ask for an item, and the item's price key",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The price the item last sold for outranks the price the market says.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The price the market says outranks a multiple of the price the vendor pays.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An item's price key is built from the fields its own kind is priced by.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An item link that parses to nothing is its own price key.",
    },
  ],
} as const satisfies Module
