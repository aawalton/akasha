import type { TemperCompletionCategory } from "akasha/temper/player/progress/temper-completion-category/temper-completion-category.page-type.types.ts"

export const charactersCharacterLevel = {
  id: "01a05fcb-e4bf-75f8-9ce6-d8a53df9e316",
  type: "page-type/temper-completion-category",
  slug: "characters-character-level",
  title: "Character Level",
  nodeId: "character-level",
  tab: "characters",
  displayOrder: 3,
  parent: "temper-completion-category/characters",
} as const satisfies TemperCompletionCategory
