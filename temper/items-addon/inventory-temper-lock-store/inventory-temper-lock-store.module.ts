import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const inventoryTemperLockStore = {
  id: "01a06258-b534-7461-bb89-2fea2828c034",
  type: "module",
  slug: "inventory-temper-lock-store",
  definition: "the temper locks kept in saved variables, keyed by slot",
  code: "ts",
} as const satisfies Module
