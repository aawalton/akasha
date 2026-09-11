import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const recipeResultIdLookup = {
  id: "01a060c5-3c26-7678-904e-bbb160325597",
  pageTypeSlug: "module",
  type: "module",
  slug: "recipe-result-id-lookup",
  definition: "the item a recipe makes, found by the recipe's name",
  code: "ts",
} as const satisfies Module
