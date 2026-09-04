import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const inventoryParserInference = {
  id: "01a060c5-3c23-70de-82a3-ad0718219283",
  pageTypeSlug: "module",
  slug: "inventory-parser-inference",
  definition: "the properties an item carries, inferred from what the game reported",
  code: "ts",
} as const satisfies Module
