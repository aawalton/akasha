import type { TemperRecipeList } from "../../temper-recipe-list.page-type.ts"

export const vegetableDishes = {
  id: "01a0626e-c111-74a4-8c68-3d49c9569ce6",
  pageTypeSlug: "temper-recipe-list",
  slug: "vegetable-dishes",
  title: "Vegetable Dishes",
  displayOrder: 3,
  recipes: "jsonl",
} as const satisfies TemperRecipeList
