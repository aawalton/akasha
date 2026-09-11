import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const inventoryLoggingTypes = {
  id: "01a060c5-3c21-7930-9244-0d69af603da1",
  pageTypeSlug: "module",
  type: "module",
  slug: "inventory-logging-types",
  definition: "how much an inventory run writes about what it did",
  code: "ts",
} as const satisfies Module
