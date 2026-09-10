import type { TemperRecipeList } from "../../temper-recipe-list.page-type.types.ts"

export const meatDishes = {
  id: "01a0626e-c111-7ccd-8fea-05e83c8c381b",
  pageTypeSlug: "temper-recipe-list",
  type: "temper-recipe-list",
  slug: "meat-dishes",
  title: "Meat Dishes",
  displayOrder: 1,
  recipes: "jsonl",
} as const satisfies TemperRecipeList
