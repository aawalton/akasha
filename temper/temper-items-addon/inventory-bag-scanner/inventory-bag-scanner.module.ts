import type { Module } from "@akasha/code-system/module"

export const inventoryBagScanner = {
  id: "01a06258-b527-7879-be77-819a741fb9ac",
  pageTypeSlug: "module",
  slug: "inventory-bag-scanner",
  definition:
    "reading every slot of one bag, whether it is a real bag, the craft bag, or an iterated one",
  code: "ts",
} as const satisfies Module
