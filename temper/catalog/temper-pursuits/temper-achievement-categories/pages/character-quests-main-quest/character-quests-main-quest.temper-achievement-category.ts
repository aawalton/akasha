import type { TemperAchievementCategory } from "akasha/temper/catalog/temper-pursuits/temper-achievement-categories/temper-achievement-category.page-type.types.ts"

export const characterQuestsMainQuest = {
  id: "01a06168-7251-7012-9245-8ea8727ade83",
  type: "temper-achievement-category",
  slug: "character-quests-main-quest",
  title: "Main Quest",
  category: "character",
  displayOrder: 0,
  parent: "character-quests",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
