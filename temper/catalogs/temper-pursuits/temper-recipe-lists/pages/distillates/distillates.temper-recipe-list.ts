import type { TemperRecipeList } from "../../temper-recipe-list.page-type.types.ts"

export const distillates = {
  id: "01a0626e-c111-7e0e-8464-70eef467e8d0",
  pageTypeSlug: "temper-recipe-list",
  type: "temper-recipe-list",
  slug: "distillates",
  title: "Distillates",
  displayOrder: 14,
  recipes: "jsonl",
} as const satisfies TemperRecipeList
