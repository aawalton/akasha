import type { Module } from "@akasha/code-system/module"

export const inventoryRulesDispatchBankWithdrawals = {
  id: "01a06258-b530-7df4-9831-55755f31aee1",
  pageTypeSlug: "module",
  slug: "inventory-rules-dispatch-bank-withdrawals",
  definition: "withdrawing items from the bank by rule, for this character and for others",
  code: "ts",
} as const satisfies Module
