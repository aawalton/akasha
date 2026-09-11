import type { TemperRecipeList } from "akasha/temper/catalog/temper-pursuits/temper-recipe-lists/temper-recipe-list.page-type.types.ts"

export const liqueurs = {
  id: "01a0626e-c111-73df-8c9d-4a6b0b31794b",
  type: "temper-recipe-list",
  slug: "liqueurs",
  title: "Liqueurs",
  displayOrder: 11,
  recipes: "jsonl",
} as const satisfies TemperRecipeList
