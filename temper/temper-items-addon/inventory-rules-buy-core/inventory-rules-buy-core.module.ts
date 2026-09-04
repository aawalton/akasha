import type { Module } from "@akasha/code-system/module"

export const inventoryRulesBuyCore = {
  id: "01a06258-b52e-7528-93cd-2becebd25548",
  pageTypeSlug: "module",
  slug: "inventory-rules-buy-core",
  definition: "how many of an item to buy given the target, the stock and the money in hand",
  code: "ts",
} as const satisfies Module
