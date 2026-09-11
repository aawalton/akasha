import type { TemperRecipeList } from "akasha/temper/catalog/temper-pursuits/temper-recipe-lists/temper-recipe-list.page-type.types.ts"

export const workshop = {
  id: "01a0626e-c112-7e1b-850c-6c8886595c0f",
  type: "temper-recipe-list",
  slug: "workshop",
  title: "Workshop",
  displayOrder: 28,
  recipes: "jsonl",
} as const satisfies TemperRecipeList
