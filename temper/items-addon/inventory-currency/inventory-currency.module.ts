import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const inventoryCurrency = {
  id: "01a06258-b52a-7942-8b11-daff55c0534e",
  type: "module",
  slug: "inventory-currency",
  definition:
    "reading a character's, the bank's and the account's currencies into the saved database",
  code: "ts",
} as const satisfies Module
