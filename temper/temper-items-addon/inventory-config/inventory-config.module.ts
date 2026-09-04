import type { Module } from "@akasha/code-system/module"

export const inventoryConfig = {
  id: "01a06258-b52c-7969-963f-a8a8e93af876",
  pageTypeSlug: "module",
  slug: "inventory-config",
  definition:
    "the settings in effect, read from the config file when present and from saved variables otherwise",
  code: "ts",
} as const satisfies Module
