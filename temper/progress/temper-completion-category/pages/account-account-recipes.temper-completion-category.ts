import type { TemperCompletionCategory } from "akasha/temper/progress/temper-completion-category/temper-completion-category.page-type.types.ts"

export const accountAccountRecipes = {
  id: "01a05fcb-e4b8-73f1-b46c-d250ff50d3ce",
  type: "temper-completion-category",
  slug: "account-account-recipes",
  title: "Crafting Recipes",
  nodeId: "account-recipes",
  tab: "account",
  displayOrder: 8,
  parent: "account",
} as const satisfies TemperCompletionCategory
