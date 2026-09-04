import type { Module } from "@akasha/code-system/module"

export const craftInventory = {
  id: "01a061c7-e851-7ab5-be91-a1e8f7b078ef",
  pageTypeSlug: "module",
  slug: "craft-inventory",
  definition: "reads the bags and banks and records what each character is holding",
  code: "ts",
} as const satisfies Module
