import type { Module } from "@akasha/code-system/module"

export const craftingState = {
  id: "01a061c7-e879-7dca-aa77-38bf5d0c6d80",
  pageTypeSlug: "module",
  slug: "crafting-state",
  definition: "the one table every crafting window reads and writes",
  code: "ts",
} as const satisfies Module
