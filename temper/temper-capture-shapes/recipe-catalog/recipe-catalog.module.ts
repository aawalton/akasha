import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const recipeCatalog = {
  id: "01a0604d-23a0-7cb1-93da-f155d5f49f5b",
  pageTypeSlug: "module",
  slug: "recipe-catalog",
  definition: "the recipes the game lists, held under recipe lists",
  code: "ts",
} as const satisfies Module
