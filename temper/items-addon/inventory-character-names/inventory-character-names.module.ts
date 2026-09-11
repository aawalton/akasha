import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const inventoryCharacterNames = {
  id: "01a06258-b52a-79c0-9278-df8b5354e611",
  type: "module",
  slug: "inventory-character-names",
  definition: "resolving a character's display name from its id",
  code: "ts",
} as const satisfies Module
