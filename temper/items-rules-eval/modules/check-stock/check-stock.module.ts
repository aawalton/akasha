import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const checkStock = {
  id: "01a06137-f969-797a-9d04-179e4e9701ba",
  type: "module",
  slug: "check-stock",
  definition:
    "the condition check over how much of a stock group characters and the bank already have",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The all-stocked threshold defaults to 200 units.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An item outside any computed stock group is treated as a group of one item id.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Stock checks are skipped when the evaluation context sets skipStock.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Bank stock is summed across the whole stock group before the target quantity is compared.",
    },
  ],
} as const satisfies Module
