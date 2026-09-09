import type { TemperRecipeList } from "../../temper-recipe-list.page-type.ts"

export const fruitDishes = {
  id: "01a0626e-c111-7f20-8052-b40e012fa131",
  pageTypeSlug: "temper-recipe-list",
  slug: "fruit-dishes",
  title: "Fruit Dishes",
  displayOrder: 2,
  recipes: "jsonl",
} as const satisfies TemperRecipeList
