import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const searchRecipeSubtypeFilter = {
  id: "01a0613a-e0ad-73d1-95f0-27bb2a879d89",
  type: "page-type/module",
  slug: "search-recipe-subtype-filter",
  definition:
    "the specialized item type of a recipe, narrowed by a multiselect of the specialized item type pages",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Each option is a specialized item type page's title under its number.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here narrows the server request.",
    },
  ],
} as const satisfies Module
