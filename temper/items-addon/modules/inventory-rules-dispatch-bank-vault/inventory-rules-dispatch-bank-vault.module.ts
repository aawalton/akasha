import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inventoryRulesDispatchBankVault = {
  id: "01a06258-b530-79eb-a110-55d5942865b1",
  type: "module",
  slug: "inventory-rules-dispatch-bank-vault",
  definition: "withdrawing from and depositing into the furniture vault by rule",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A vault withdrawal goes straight to the game rather than onto the paced chain.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A visit sends at most a fixed number of vault withdrawals, and says so on stopping there.",
    },
  ],
} as const satisfies Module
