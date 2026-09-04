import type { Module } from "@akasha/code-system/module"

export const inventoryBankProfileTypes = {
  id: "01a06258-b527-7915-816c-0fe369278f4e",
  pageTypeSlug: "module",
  slug: "inventory-bank-profile-types",
  definition: "the shapes of a bank-session profiler record, its buckets and its capture",
  code: "ts",
} as const satisfies Module
