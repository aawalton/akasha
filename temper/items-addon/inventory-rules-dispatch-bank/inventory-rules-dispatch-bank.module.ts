import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const inventoryRulesDispatchBank = {
  id: "01a06258-b531-7715-8d2a-26fd26ca0747",
  pageTypeSlug: "module",
  type: "module",
  slug: "inventory-rules-dispatch-bank",
  definition: "what happens when the bank opens, and the one move used by every bank step",
  code: "ts",
} as const satisfies Module
