import type { TemperCompletionCategory } from "akasha/temper/progressions/temper-completion-categories/temper-completion-category.page-type.types.ts"

export const charactersRecipes = {
  id: "01a05fcb-e4c1-790b-b1ae-0391efd1763e",
  type: "temper-completion-category",
  slug: "characters-recipes",
  title: "Crafting Recipes",
  nodeId: "recipes",
  tab: "characters",
  displayOrder: 7,
  parent: "characters",
} as const satisfies TemperCompletionCategory
