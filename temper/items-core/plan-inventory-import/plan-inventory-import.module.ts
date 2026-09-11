import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const planInventoryImport = {
  id: "01a060c5-3c26-7764-9bef-e46e8fff9902",
  type: "module",
  slug: "plan-inventory-import",
  definition: "what an inventory import writes and what it leaves alone",
  code: "ts",
} as const satisfies Module
