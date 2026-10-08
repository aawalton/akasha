import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inventoryRuleMatcher = {
  id: "01a06151-370d-7de2-bef2-fe7d3f33567a",
  type: "page-type/module",
  slug: "inventory-rule-matcher",
  definition: "every item each rule affects, found by trying the compiled rules over the holdings",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An item is taken by the first rule the item matches.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A rule that is off shows what that rule would have taken.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An item no rule claims falls to the implicit terminal rule.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The items one rule leaves over are offered to the rule below.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A run whose rules are unchanged answers from the cache.",
    },
  ],
  createdAt: "2026-09-02T08:51:47.597Z",
  updatedAt: "2026-09-21T15:36:01.000Z",
} as const satisfies Module
