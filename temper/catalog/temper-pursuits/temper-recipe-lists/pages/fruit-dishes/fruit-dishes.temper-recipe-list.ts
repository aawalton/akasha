import type { TemperRecipeList } from "akasha/temper/catalog/temper-pursuits/temper-recipe-lists/temper-recipe-list.page-type.types.ts"

export const fruitDishes = {
  id: "01a0626e-c111-7f20-8052-b40e012fa131",
  type: "temper-recipe-list",
  slug: "fruit-dishes",
  title: "Fruit Dishes",
  displayOrder: 2,
  recipes: "jsonl",
} as const satisfies TemperRecipeList
