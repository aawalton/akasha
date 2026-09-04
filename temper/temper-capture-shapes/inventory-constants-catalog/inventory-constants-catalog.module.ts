import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const inventoryConstantsCatalog = {
  id: "01a0604d-239d-7405-9aec-cb8c929b1a0a",
  pageTypeSlug: "module",
  slug: "inventory-constants-catalog",
  definition: "the item type, filter, category, equip, weapon and armor numbers the game uses",
  code: "ts",
} as const satisfies Module
