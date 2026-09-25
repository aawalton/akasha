import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const watcherPricingTables = {
  id: "01a06381-35cf-7f9a-8a86-81d472cd7c24",
  type: "page-type/module",
  slug: "watcher-pricing-tables",
  definition: "the currency rates and crown replacement costs handed to the inventory addon",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/stopgap",
      statement: "Both tables come back empty.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Every run says the tables are empty rather than saying once that the tables are empty.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The words said go to the watcher log rather than to the console.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A caller may hand in the log the words go to.",
    },
  ],
} as const satisfies Module
