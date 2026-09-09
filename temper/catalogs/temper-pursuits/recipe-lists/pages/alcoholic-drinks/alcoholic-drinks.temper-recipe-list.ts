import type { TemperRecipeList } from "../../temper-recipe-list.page-type.ts"

export const alcoholicDrinks = {
  id: "01a0626e-c111-7a97-961c-e0d23b79696b",
  pageTypeSlug: "temper-recipe-list",
  slug: "alcoholic-drinks",
  title: "Alcoholic Drinks",
  displayOrder: 8,
  recipes: "jsonl",
} as const satisfies TemperRecipeList
