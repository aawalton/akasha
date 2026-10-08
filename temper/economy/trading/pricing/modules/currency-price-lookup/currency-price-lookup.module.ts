import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const currencyPriceLookup = {
  id: "01a0609b-e59f-7b46-be31-61f15235677d",
  type: "page-type/module",
  slug: "currency-price-lookup",
  definition: "what a telvar stone, an alliance point and a writ voucher are worth in gold",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A rate is read off the gold price of an item that currency buys.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Gold is worth one gold.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A currency with no priced item has no rate.",
    },
  ],
  createdAt: "2026-09-02T05:33:44.735Z",
  updatedAt: "2026-09-21T15:12:49.000Z",
} as const satisfies Module
