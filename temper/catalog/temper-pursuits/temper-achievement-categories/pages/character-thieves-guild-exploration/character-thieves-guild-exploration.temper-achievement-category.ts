import type { TemperAchievementCategory } from "akasha/temper/catalog/temper-pursuits/temper-achievement-categories/temper-achievement-category.page-type.types.ts"

export const characterThievesGuildExploration = {
  id: "01a06168-7252-7014-8273-24cad8b38ec5",
  type: "temper-achievement-category",
  slug: "character-thieves-guild-exploration",
  title: "Exploration",
  category: "character",
  displayOrder: 0,
  parent: "character-thieves-guild",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
