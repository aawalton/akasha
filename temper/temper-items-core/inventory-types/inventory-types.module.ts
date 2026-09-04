import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const inventoryTypes = {
  id: "01a060c5-3c23-76ec-aa93-fa279ae67a96",
  pageTypeSlug: "module",
  slug: "inventory-types",
  definition: "what an inventory holds and the item numbers the game gives",
  code: "ts",
} as const satisfies Module
