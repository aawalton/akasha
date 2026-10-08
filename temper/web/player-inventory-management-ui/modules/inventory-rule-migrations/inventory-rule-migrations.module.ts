import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inventoryRuleMigrations = {
  id: "01a0636c-5d9b-77bf-a596-9a698e6b001e",
  type: "page-type/module",
  slug: "inventory-rule-migrations",
  definition: "an older inventory rule turned into the shape the rules take now",
  code: "ts",
  createdAt: "2026-09-02T18:40:41.371Z",
  updatedAt: "2026-09-22T13:28:06.000Z",
} as const satisfies Module
