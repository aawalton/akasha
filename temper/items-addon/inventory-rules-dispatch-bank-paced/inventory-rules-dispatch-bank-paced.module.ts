import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const inventoryRulesDispatchBankPaced = {
  id: "01a06258-b530-7ef5-9ff0-40428a6c5232",
  type: "module",
  slug: "inventory-rules-dispatch-bank-paced",
  definition: "the paced chain of bank moves that waits for each one to settle",
  code: "ts",
} as const satisfies Module
