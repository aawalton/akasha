import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const stockItemPriority = {
  id: "01a0ded1-749f-7c35-acf6-d88f29120f2f",
  type: "page-type/module",
  slug: "stock-item-priority",
  definition: "where an item falls in the order a stock rule fills its targets in",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An item earlier in a rule's item ids fills that rule's targets first.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A rule listing no item ids ranks every item alike, so slot order decides.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An item the list does not name ranks after every item it names.",
    },
  ],
} as const satisfies Module
