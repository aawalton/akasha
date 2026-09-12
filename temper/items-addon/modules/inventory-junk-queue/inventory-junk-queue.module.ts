import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const inventoryJunkQueue = {
  id: "01a06258-b52d-7f4b-bdbd-e12809ac7ab9",
  type: "module",
  slug: "inventory-junk-queue",
  definition: "gating the junk flag so a burst of changes is applied once",
  code: "ts",
} as const satisfies Module
