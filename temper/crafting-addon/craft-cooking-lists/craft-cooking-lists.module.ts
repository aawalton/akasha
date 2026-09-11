import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const craftCookingLists = {
  id: "01a08e69-e336-7e71-b562-58e9c8e75d47",
  type: "module",
  slug: "craft-cooking-lists",
  definition: "the recipe rows a cooking category or a search fills the food panel with",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A row reaches the panel through the shared row builder.",
    },
    {
      invariantKind: "departure",
      statement: "A search covers every recipe list rather than the category shown.",
    },
    {
      invariantKind: "departure",
      statement: "The favourites categories are read off the character.",
    },
  ],
} as const satisfies Module
