import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const bopTradeableFilter = {
  id: "01a06100-3be1-7979-a9b4-6bd9fb79cac2",
  pageTypeSlug: "module",
  slug: "bop-tradeable-filter",
  definition: "the BoP-Tradeable Status condition a rule may carry, as the rule editor offers it",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "This filter reads and writes the `bopTradeable` condition alone.",
    },
  ],
} as const satisfies Module
