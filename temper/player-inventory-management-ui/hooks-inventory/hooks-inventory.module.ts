import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const hooksInventory = {
  id: "01a0636c-5d97-76ed-b991-13a9b7f8000d",
  pageTypeSlug: "module",
  type: "module",
  slug: "hooks-inventory",
  definition: "one player's inventory and its prices, read for a browser",
  code: "ts",
} as const satisfies Module
