import type { TemperCompletionCategory } from "akasha/temper/progressions/temper-completion-categories/temper-completion-category.page-type.types.ts"

export const charactersCharacterAchievements = {
  id: "01a05fcb-e4be-7eac-a655-11822b021472",
  type: "temper-completion-category",
  slug: "characters-character-achievements",
  title: "Achievements",
  nodeId: "character-achievements",
  tab: "characters",
  displayOrder: 0,
  parent: "characters",
} as const satisfies TemperCompletionCategory
