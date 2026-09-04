import type { TemperRecipeList } from "../../temper-recipe-list.page-type.ts"

export const liqueurs = {
  id: "01a0626e-c111-73df-8c9d-4a6b0b31794b",
  pageTypeSlug: "temper-recipe-list",
  slug: "liqueurs",
  title: "Liqueurs",
  displayOrder: 11,
  recipes: "jsonl",
} as const satisfies TemperRecipeList
