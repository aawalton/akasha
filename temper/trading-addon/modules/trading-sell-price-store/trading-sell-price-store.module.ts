import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const tradingSellPriceStore = {
  id: "01a06160-2a5d-79d4-915e-5e5a9fa1e318",
  type: "page-type/module",
  slug: "trading-sell-price-store",
  definition: "what an item last sold for, kept per item so a later sale can start there",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A price is kept per item link rather than per stack.",
    },
  ],
} as const satisfies Module
