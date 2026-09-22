import type { TemperCompletionCategory } from "akasha/temper/player/progress/temper-completion-category/temper-completion-category.page-type.types.ts"

export const charactersTraitResearch = {
  id: "01a05fcb-e4c5-7cd9-84bd-769444ac16f8",
  type: "page-type/temper-completion-category",
  slug: "characters-trait-research",
  title: "Crafting Traits",
  nodeId: "trait-research",
  tab: "characters",
  displayOrder: 8,
  parent: "temper-completion-category/characters",
} as const satisfies TemperCompletionCategory
