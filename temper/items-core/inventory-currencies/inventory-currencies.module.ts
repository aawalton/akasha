import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const inventoryCurrencies = {
  id: "01a060d9-498c-7c05-9240-5bc178215b0b",
  pageTypeSlug: "module",
  type: "module",
  slug: "inventory-currencies",
  definition: "an account's currency balances gathered per currency and totalled",
  code: "ts",
} as const satisfies Module
