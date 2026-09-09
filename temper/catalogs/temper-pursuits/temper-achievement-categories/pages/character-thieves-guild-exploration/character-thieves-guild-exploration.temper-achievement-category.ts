import type { TemperAchievementCategory } from "../../temper-achievement-category.page-type.ts"

export const characterThievesGuildExploration = {
  id: "01a06168-7252-7014-8273-24cad8b38ec5",
  pageTypeSlug: "temper-achievement-category",
  slug: "character-thieves-guild-exploration",
  title: "Exploration",
  category: "character",
  displayOrder: 0,
  parent: "character-thieves-guild",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
