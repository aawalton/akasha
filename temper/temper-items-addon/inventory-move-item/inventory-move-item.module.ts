import type { Module } from "@akasha/code-system/module"

export const inventoryMoveItem = {
  id: "01a06267-2a3a-7e2c-9719-6644235937c6",
  pageTypeSlug: "module",
  slug: "inventory-move-item",
  definition:
    "moving a stack between two slots through the protected call when the game requires it",
  code: "ts",
} as const satisfies Module
