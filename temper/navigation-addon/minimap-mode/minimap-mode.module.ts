import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const minimapMode = {
  id: "01a06269-2985-7df3-acd1-ee4171adcd4a",
  pageTypeSlug: "module",
  type: "module",
  slug: "minimap-mode",
  definition: "the world map switched between its own mode and the minimap's",
  code: "ts",
} as const satisfies Module
