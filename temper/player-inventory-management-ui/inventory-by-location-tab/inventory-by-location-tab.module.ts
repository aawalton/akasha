import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const inventoryByLocationTab = {
  id: "01a0636c-5d9a-7374-a500-82c80d66000f",
  pageTypeSlug: "module",
  type: "module",
  slug: "inventory-by-location-tab",
  definition: "the tab breaking an inventory down by where its items sit",
  code: "tsx",
} as const satisfies Module
