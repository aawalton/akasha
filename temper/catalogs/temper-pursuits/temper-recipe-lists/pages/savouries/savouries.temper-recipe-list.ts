import type { TemperRecipeList } from "../../temper-recipe-list.page-type.types.ts"

export const savouries = {
  id: "01a0626e-c111-799f-b133-c1f15b68c6ce",
  pageTypeSlug: "temper-recipe-list",
  type: "temper-recipe-list",
  slug: "savouries",
  title: "Savouries",
  displayOrder: 4,
  recipes: "jsonl",
} as const satisfies TemperRecipeList
