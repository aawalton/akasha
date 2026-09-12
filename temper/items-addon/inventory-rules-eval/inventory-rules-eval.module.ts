import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const inventoryRulesEval = {
  id: "01a06258-b533-78d1-9e55-12407ea45377",
  type: "module",
  slug: "inventory-rules-eval",
  definition: "judging every slot against the rules and recording the pending action for each",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "Judging the whole backpack is one call, so a venue reading those actions refreshes them first.",
    },
    {
      invariantKind: "departure",
      statement: "Every backpack slot in one judging shares the claims and the stock groups.",
    },
  ],
} as const satisfies Module
