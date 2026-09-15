import type { TemperCompletionCategory } from "akasha/temper/progress/temper-completion-category/temper-completion-category.page-type.types.ts"

export const charactersCompanionQuests = {
  id: "01a05fcb-e4bf-719e-8378-105cd0685b7d",
  type: "page-type/temper-completion-category",
  slug: "characters-companion-quests",
  title: "Companion Quests",
  nodeId: "companion-quests",
  tab: "characters",
  displayOrder: 4,
  parent: "characters",
} as const satisfies TemperCompletionCategory
