import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const inventoryCurrencies = {
  id: "01a060d9-498c-7c05-9240-5bc178215b0b",
  pageTypeSlug: "module",
  slug: "inventory-currencies",
  definition: "an account's currency balances gathered per currency and totalled",
  code: "ts",
} as const satisfies Module
