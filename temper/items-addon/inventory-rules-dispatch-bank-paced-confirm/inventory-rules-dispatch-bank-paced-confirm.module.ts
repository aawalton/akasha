import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const inventoryRulesDispatchBankPacedConfirm = {
  id: "01a06258-b530-714c-9441-2a4a09f6f3b7",
  type: "module",
  slug: "inventory-rules-dispatch-bank-paced-confirm",
  definition: "whether a paced bank move landed, judged by the stack left behind",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A move landed where the stack left behind is no more than what the move was to leave.",
    },
  ],
} as const satisfies Module
