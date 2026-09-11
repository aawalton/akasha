import type { TemperAchievementCategory } from "akasha/temper/catalog/temper-pursuits/temper-achievement-categories/temper-achievement-category.page-type.types.ts"

export const characterSolsticeExploration = {
  id: "01a06168-7251-7014-b9e8-e62efa608a37",
  type: "temper-achievement-category",
  slug: "character-solstice-exploration",
  title: "Exploration",
  category: "character",
  displayOrder: 0,
  parent: "character-solstice",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
