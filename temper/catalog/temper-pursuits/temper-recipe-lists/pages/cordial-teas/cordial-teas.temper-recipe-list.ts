import type { TemperRecipeList } from "akasha/temper/catalog/temper-pursuits/temper-recipe-lists/temper-recipe-list.page-type.types.ts"

export const cordialTeas = {
  id: "01a0626e-c111-7264-be07-c1044ab1f4b4",
  type: "temper-recipe-list",
  slug: "cordial-teas",
  title: "Cordial Teas",
  displayOrder: 13,
  recipes: "jsonl",
} as const satisfies TemperRecipeList
