import type { TemperRecipeList } from "../../temper-recipe-list.page-type.ts"

export const tonics = {
  id: "01a0626e-c111-7b77-8c77-e89e84dc2403",
  pageTypeSlug: "temper-recipe-list",
  slug: "tonics",
  title: "Tonics",
  displayOrder: 10,
  recipes: "jsonl",
} as const satisfies TemperRecipeList
