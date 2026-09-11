import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const inventoryLocationKeys = {
  id: "01a06258-b52d-73dd-a737-4d65e20a8ab3",
  type: "module",
  slug: "inventory-location-keys",
  definition: "the key each location is saved under, for characters, banks, houses and companions",
  code: "ts",
} as const satisfies Module
