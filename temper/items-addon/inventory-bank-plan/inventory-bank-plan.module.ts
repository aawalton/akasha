import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const inventoryBankPlan = {
  id: "01a06258-b527-70e5-bb07-c8089c31f94d",
  pageTypeSlug: "module",
  type: "module",
  slug: "inventory-bank-plan",
  definition: "a summary of what a bank visit will deposit and withdraw before it happens",
  code: "ts",
} as const satisfies Module
