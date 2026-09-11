import type { TemperRecipeList } from "akasha/temper/catalog/temper-pursuits/temper-recipe-lists/temper-recipe-list.page-type.types.ts"

export const savouries = {
  id: "01a0626e-c111-799f-b133-c1f15b68c6ce",
  type: "temper-recipe-list",
  slug: "savouries",
  title: "Savouries",
  displayOrder: 4,
  recipes: "jsonl",
} as const satisfies TemperRecipeList
