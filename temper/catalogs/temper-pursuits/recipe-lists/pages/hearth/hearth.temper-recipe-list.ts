import type { TemperRecipeList } from "../../temper-recipe-list.page-type.ts"

export const hearth = {
  id: "01a0626e-c112-7b28-8247-bc18dc99c946",
  pageTypeSlug: "temper-recipe-list",
  slug: "hearth",
  title: "Hearth",
  displayOrder: 21,
  recipes: "jsonl",
} as const satisfies TemperRecipeList
