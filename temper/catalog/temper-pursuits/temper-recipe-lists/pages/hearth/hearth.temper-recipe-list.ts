import type { TemperRecipeList } from "akasha/temper/catalog/temper-pursuits/temper-recipe-lists/temper-recipe-list.page-type.types.ts"

export const hearth = {
  id: "01a0626e-c112-7b28-8247-bc18dc99c946",
  type: "temper-recipe-list",
  slug: "hearth",
  title: "Hearth",
  displayOrder: 21,
  recipes: "jsonl",
} as const satisfies TemperRecipeList
