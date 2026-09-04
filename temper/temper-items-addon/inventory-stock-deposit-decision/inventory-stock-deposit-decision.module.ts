import type { Module } from "@akasha/code-system/module"

export const inventoryStockDepositDecision = {
  id: "01a06258-b534-7658-a6f9-6918c06107d4",
  pageTypeSlug: "module",
  slug: "inventory-stock-deposit-decision",
  definition: "how much of a stock tier to deposit given what is held and what is wanted",
  code: "ts",
} as const satisfies Module
