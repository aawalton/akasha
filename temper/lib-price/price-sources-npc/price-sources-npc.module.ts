import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const priceSourcesNpc = {
  id: "01a0615d-c21b-71c6-af18-6daf1799bdbc",
  type: "module",
  slug: "price-sources-npc",
  definition: "the price a game vendor buys or sells an item at",
  code: "ts",
} as const satisfies Module
