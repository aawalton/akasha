import type { TemperCompletionCategory } from "akasha/temper/player/progress/temper-completion-category/temper-completion-category.page-type.types.ts"

export const charactersCharacterAchievements = {
  id: "01a05fcb-e4be-7eac-a655-11822b021472",
  type: "page-type/temper-completion-category",
  slug: "characters-character-achievements",
  title: "Achievements",
  nodeId: "character-achievements",
  tab: "characters",
  displayOrder: 0,
  parent: "temper-completion-category/characters",
} as const satisfies TemperCompletionCategory
