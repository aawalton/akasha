import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const inventoryItemData = {
  id: "01a06258-b52d-7b46-8cda-3be08ef726d7",
  type: "module",
  slug: "inventory-item-data",
  definition: "reading one slot into the saved item shape, with its price source and lock state",
  code: "ts",
} as const satisfies Module
