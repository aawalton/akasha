import type { Module } from "@akasha/code-system/module"

export const inventoryWritDetection = {
  id: "01a06258-b536-7356-be88-ffa8fd44d008",
  pageTypeSlug: "module",
  slug: "inventory-writ-detection",
  definition: "the writs and master writs active in the journal, read from quest conditions",
  code: "ts",
} as const satisfies Module
