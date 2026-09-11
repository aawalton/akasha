import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const inventoryDatabaseSchema = {
  id: "01a060c5-3c1f-7102-9890-60736d959f93",
  pageTypeSlug: "module",
  slug: "inventory-database-schema",
  definition: "the zod shape an inventory row is checked against",
  code: "ts",
} as const satisfies Module
