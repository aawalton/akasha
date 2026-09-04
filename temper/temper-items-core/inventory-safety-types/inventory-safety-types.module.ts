import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const inventorySafetyTypes = {
  id: "01a060c5-3c23-74f6-af7d-2a1dd331431c",
  pageTypeSlug: "module",
  slug: "inventory-safety-types",
  definition: "the actions a player must agree to before they run",
  code: "ts",
} as const satisfies Module
