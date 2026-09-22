import type { TemperCompletionCategory } from "akasha/temper/player/progress/temper-completion-category/temper-completion-category.page-type.types.ts"

export const charactersRecipes = {
  id: "01a05fcb-e4c1-790b-b1ae-0391efd1763e",
  type: "page-type/temper-completion-category",
  slug: "characters-recipes",
  title: "Crafting Recipes",
  nodeId: "recipes",
  tab: "characters",
  displayOrder: 7,
  parent: "temper-completion-category/characters",
} as const satisfies TemperCompletionCategory
