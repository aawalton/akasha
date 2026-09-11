import type { TemperAchievementCategory } from "akasha/temper/catalog/temper-pursuits/temper-achievement-categories/temper-achievement-category.page-type.types.ts"

export const characterQuests = {
  id: "01a06168-7251-7011-ae97-ef53ff614b77",
  type: "temper-achievement-category",
  slug: "character-quests",
  title: "Quests",
  category: "character",
  displayOrder: 3,
} as const satisfies TemperAchievementCategory
