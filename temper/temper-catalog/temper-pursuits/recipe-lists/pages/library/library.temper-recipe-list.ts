import type { TemperRecipeList } from "../../temper-recipe-list.page-type.ts"

export const library = {
  id: "01a0626e-c112-78e7-989e-1314cc051824",
  pageTypeSlug: "temper-recipe-list",
  slug: "library",
  title: "Library",
  displayOrder: 22,
  recipes: "jsonl",
} as const satisfies TemperRecipeList
