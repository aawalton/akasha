import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const inventoryRulesDispatchBank = {
  id: "01a06258-b531-7715-8d2a-26fd26ca0747",
  type: "module",
  slug: "inventory-rules-dispatch-bank",
  definition: "what happens when the bank opens, and the one move used by every bank step",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Withdrawing and depositing are each allowed their own moves in a visit.",
    },
    {
      invariantKind: "departure",
      statement: "Every backpack slot is judged afresh when the bank opens.",
    },
  ],
} as const satisfies Module
