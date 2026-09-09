import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const searchRecipeSubtypeFilter = {
  id: "01a0613a-e0ad-73d1-95f0-27bb2a879d89",
  pageTypeSlug: "module",
  slug: "search-recipe-subtype-filter",
  definition:
    "the specialized item type of a recipe, narrowed by a multiselect of nine recipe subtypes",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "The nine option values are client specialized item-type numbers 170 through 178.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here narrows the server request.",
    },
  ],
} as const satisfies Module
