import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inventoryRuleMatcher = {
  id: "01a06151-370d-7de2-bef2-fe7d3f33567a",
  type: "module",
  slug: "inventory-rule-matcher",
  definition: "every item each rule affects, found by trying the compiled rules over the holdings",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "An item is taken by the first rule the item matches.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A rule that is off shows what that rule would have taken.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An item no rule claims falls to the implicit terminal rule.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The items one rule leaves over are offered to the rule below.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A run whose rules are unchanged answers from the cache.",
    },
  ],
} as const satisfies Module
