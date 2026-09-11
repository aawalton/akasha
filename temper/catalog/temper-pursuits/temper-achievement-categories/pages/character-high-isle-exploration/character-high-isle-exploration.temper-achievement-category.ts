import type { TemperAchievementCategory } from "akasha/temper/catalog/temper-pursuits/temper-achievement-categories/temper-achievement-category.page-type.types.ts"

export const characterHighIsleExploration = {
  id: "01a06168-7251-701a-9053-58dd9e433f0e",
  type: "temper-achievement-category",
  slug: "character-high-isle-exploration",
  title: "Exploration",
  category: "character",
  displayOrder: 0,
  parent: "character-high-isle",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
