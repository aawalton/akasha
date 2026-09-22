import type { TemperCompletionCategory } from "akasha/temper/player/progress/temper-completion-category/temper-completion-category.page-type.types.ts"

export const charactersQuests = {
  id: "01a05fcb-e4c1-7c24-b6fd-af7544c2ac19",
  type: "page-type/temper-completion-category",
  slug: "characters-quests",
  title: "Quests",
  nodeId: "quests",
  tab: "characters",
  displayOrder: 13,
  parent: "temper-completion-category/characters",
} as const satisfies TemperCompletionCategory
