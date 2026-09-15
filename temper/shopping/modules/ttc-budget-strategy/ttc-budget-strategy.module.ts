import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const ttcBudgetStrategy = {
  id: "01a060cf-b0af-7945-b272-f1393abf11ca",
  type: "page-type/module",
  slug: "ttc-budget-strategy",
  definition: "how far above the cheapest listing a buyer should be willing to go",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A market with few entries earns the loosest ceiling.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A narrow spread between the lowest and the highest price earns a tight ceiling.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A sale average well under the lowest asking price earns a tight ceiling.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A price the dump says nothing about earns the middle ceiling.",
    },
  ],
} as const satisfies Module
