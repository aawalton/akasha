import type { Module } from "@akasha/code-system/module"

export const inventoryTemperLockMigrate = {
  id: "01a06258-b534-79fe-8755-b39b437e39b1",
  pageTypeSlug: "module",
  slug: "inventory-temper-lock-migrate",
  definition: "moving the older lock table into the temper locks",
  code: "ts",
} as const satisfies Module
