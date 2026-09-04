import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const currencyCatalog = {
  id: "01a0604d-239d-7251-a9fa-c53450a7d1ac",
  pageTypeSlug: "module",
  slug: "currency-catalog",
  definition: "what the game states about one currency and whether a bank holds that currency",
  code: "ts",
} as const satisfies Module
