import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inventoryCurrencies = {
  id: "01a060d9-498c-7c05-9240-5bc178215b0b",
  type: "page-type/module",
  slug: "inventory-currencies",
  definition: "an account's currency balances filed per currency and totalled",
  code: "ts",
  createdAt: "2026-09-02T06:40:48.012Z",
  updatedAt: "2026-09-22T14:23:56.000Z",
} as const satisfies Module
