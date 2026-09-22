import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inventoryDatabaseSchema = {
  id: "01a060c5-3c1f-7102-9890-60736d959f93",
  type: "page-type/module",
  slug: "inventory-database-schema",
  definition: "the zod shape checking an inventory row",
  code: "ts",
} as const satisfies Module
