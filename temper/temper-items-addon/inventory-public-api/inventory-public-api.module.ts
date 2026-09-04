import type { Module } from "@akasha/code-system/module"

export const inventoryPublicApi = {
  id: "01a06258-b52e-7bf2-90d3-ce5a8ded6d22",
  pageTypeSlug: "module",
  slug: "inventory-public-api",
  definition: "the global table this add-on publishes for keybinds and other add-ons",
  code: "ts",
} as const satisfies Module
