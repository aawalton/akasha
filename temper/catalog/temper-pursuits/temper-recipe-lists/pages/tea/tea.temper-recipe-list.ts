import type { TemperRecipeList } from "akasha/temper/catalog/temper-pursuits/temper-recipe-lists/temper-recipe-list.page-type.types.ts"

export const tea = {
  id: "01a0626e-c111-77ff-b925-4c08bfe7c20b",
  type: "temper-recipe-list",
  slug: "tea",
  title: "Tea",
  displayOrder: 9,
  recipes: "jsonl",
} as const satisfies TemperRecipeList
