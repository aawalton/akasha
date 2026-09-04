import type { Module } from "@akasha/code-system/module"

export const inventoryRulesCore = {
  id: "01a06258-b52f-7ec6-83ba-06a944af6ce4",
  pageTypeSlug: "module",
  slug: "inventory-rules-core",
  definition: "the compiled rule config and the pending actions keyed by slot",
  code: "ts",
} as const satisfies Module
