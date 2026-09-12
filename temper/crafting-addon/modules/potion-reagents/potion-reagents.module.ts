import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const potionReagents = {
  id: "01a061c7-e885-79e9-93d5-3b3b9841d3cc",
  type: "module",
  slug: "potion-reagents",
  definition: "the reagents the search is allowed to draw on",
  code: "ts",
} as const satisfies Module
