import type { TemperAchievementCategory } from "akasha/temper/catalog/temper-pursuits/temper-achievement-categories/temper-achievement-category.page-type.types.ts"

export const characterExplorationPublicDungeons = {
  id: "01a06168-7251-7010-8c2d-0266fc28aa10",
  type: "temper-achievement-category",
  slug: "character-exploration-public-dungeons",
  title: "Public Dungeons",
  category: "character",
  displayOrder: 0,
  parent: "character-exploration",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
