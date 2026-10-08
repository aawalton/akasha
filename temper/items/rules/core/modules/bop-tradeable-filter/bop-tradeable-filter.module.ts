import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const bopTradeableFilter = {
  id: "01a06100-3be1-7979-a9b4-6bd9fb79cac2",
  type: "page-type/module",
  slug: "bop-tradeable-filter",
  definition: "the `bopTradeable` condition a rule may carry, as the rule editor offers it",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "This filter reads and writes the `bopTradeable` condition alone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "This filter is shown under its condition field page's title.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "This filter's options are its condition field's value pages.",
    },
  ],
  createdAt: "2026-09-02T07:23:20.417Z",
  updatedAt: "2026-09-27T10:46:36.000Z",
} as const satisfies Module
