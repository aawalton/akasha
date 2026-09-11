import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const inventoryWritToggles = {
  id: "01a06258-b536-77ea-bcb3-052c1720a04f",
  type: "module",
  slug: "inventory-writ-toggles",
  definition: "which writs and master writs are automated for a character, from its settings",
  code: "ts",
} as const satisfies Module
