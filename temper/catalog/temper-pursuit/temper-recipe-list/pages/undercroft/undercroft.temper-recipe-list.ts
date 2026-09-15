import type { TemperRecipeList } from "akasha/temper/catalog/temper-pursuit/temper-recipe-list/temper-recipe-list.page-type.types.ts"

export const undercroft = {
  id: "01a0626e-c112-7e8e-86d2-442215220a3a",
  type: "page-type/temper-recipe-list",
  slug: "undercroft",
  title: "Undercroft",
  displayOrder: 27,
  recipes: "jsonl",
} as const satisfies TemperRecipeList
