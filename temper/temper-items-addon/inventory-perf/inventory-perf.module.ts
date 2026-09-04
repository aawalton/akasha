import type { Module } from "@akasha/code-system/module"

export const inventoryPerf = {
  id: "01a06258-b52e-732c-b265-f306f7cb43fd",
  pageTypeSlug: "module",
  slug: "inventory-perf",
  definition: "how long the add-on took to load, reported when tracing is turned on",
  code: "ts",
} as const satisfies Module
