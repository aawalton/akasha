import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const inventoryRuleMigrations = {
  id: "01a0636c-5d9b-77bf-a596-9a698e6b001e",
  type: "module",
  slug: "inventory-rule-migrations",
  definition: "an older inventory rule read into the shape the rules take now",
  code: "ts",
} as const satisfies Module
