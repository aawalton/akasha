import type { TemperCompletionCategory } from "akasha/temper/progressions/temper-completion-categories/temper-completion-category.page-type.types.ts"

export const charactersCharacterLevel = {
  id: "01a05fcb-e4bf-75f8-9ce6-d8a53df9e316",
  type: "temper-completion-category",
  slug: "characters-character-level",
  title: "Character Level",
  nodeId: "character-level",
  tab: "characters",
  displayOrder: 3,
  parent: "characters",
} as const satisfies TemperCompletionCategory
