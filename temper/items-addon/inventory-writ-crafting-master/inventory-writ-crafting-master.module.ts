import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const inventoryWritCraftingMaster = {
  id: "01a06258-b536-7fd0-a958-613c49f6b6f2",
  pageTypeSlug: "module",
  type: "module",
  slug: "inventory-writ-crafting-master",
  definition: "dispatching a master writ at the station that can fill it",
  code: "ts",
} as const satisfies Module
