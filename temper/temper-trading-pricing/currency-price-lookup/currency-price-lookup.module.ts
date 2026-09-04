import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const currencyPriceLookup = {
  id: "01a0609b-e59f-7b46-be31-61f15235677d",
  pageTypeSlug: "module",
  slug: "currency-price-lookup",
  definition: "what a telvar stone, an alliance point and a writ voucher are worth in gold",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A rate is read off the gold price of an item that currency buys.",
    },
    {
      invariantKind: "departure",
      statement: "Gold is worth one.",
    },
    {
      invariantKind: "departure",
      statement: "A currency with no priced item carries no rate.",
    },
  ],
} as const satisfies Module
