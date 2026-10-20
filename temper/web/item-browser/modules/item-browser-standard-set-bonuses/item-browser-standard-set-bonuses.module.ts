import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const itemBrowserStandardSetBonuses = {
  id: "01a15a10-1639-7fd8-a6aa-b979f2bbe9a4",
  type: "page-type/module",
  slug: "item-browser-standard-set-bonuses",
  definition: "which set bonus lines are the standard ones every 5-piece set draws from",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A standard 5-piece set is a set whose bonuses need exactly 2, 3, 4 and 5 pieces.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A set bonus is standard where it is a 2-, 3- or 4-piece bonus of a standard 5-piece set.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A set bonus is matched to a standard one by its text with every number taken out.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A bonus matching a standard one is standard on any set and at any piece count.",
    },
  ],
  createdAt: "2026-10-20T16:06:06.137Z",
  updatedAt: "2026-10-20T16:06:06.137Z",
} as const satisfies Module
