import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const inventoryBackpackBuffer = {
  id: "01a06258-b526-7d25-ae50-a9ad55256535",
  type: "module",
  slug: "inventory-backpack-buffer",
  definition: "how many backpack slots are kept free, and whether there is room above that buffer",
  code: "ts",
} as const satisfies Module
