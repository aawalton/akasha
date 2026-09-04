import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const assembleInventory = {
  id: "01a060c5-3c1c-7a77-9224-6e18bed0f40c",
  pageTypeSlug: "module",
  slug: "assemble-inventory",
  definition: "an inventory built from the rows a capture wrote",
  code: "ts",
} as const satisfies Module
