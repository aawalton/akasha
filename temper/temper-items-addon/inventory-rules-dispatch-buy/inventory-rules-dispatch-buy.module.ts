import type { Module } from "@akasha/code-system/module"

export const inventoryRulesDispatchBuy = {
  id: "01a06258-b531-7fee-9693-0454e9110b2d",
  pageTypeSlug: "module",
  slug: "inventory-rules-dispatch-buy",
  definition: "buying items at a store by rule, up to the target quantity",
  code: "ts",
} as const satisfies Module
