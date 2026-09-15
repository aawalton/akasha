import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inventoryRulesEval = {
  id: "01a06258-b533-78d1-9e55-12407ea45377",
  type: "module",
  slug: "inventory-rules-eval",
  definition: "judging every slot against the rules and recording the pending action for each",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "Judging the whole backpack is one call, so a venue reading those actions refreshes them first.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every backpack slot in one judging shares the claims and the stock groups.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "Judging a slot answers the rule it matched, so a caller wanting that judges once.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An item judged and taken by no rule is recorded as resolved to nothing.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An addon holding no compiled rules judges no item.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every judging is told whether the price source answered with no price table.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Nothing is recorded for an item the addon did not judge.",
    },
  ],
} as const satisfies Module
