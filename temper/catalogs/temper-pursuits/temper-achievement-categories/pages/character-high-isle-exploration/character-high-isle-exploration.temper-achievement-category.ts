import type { TemperAchievementCategory } from "../../temper-achievement-category.page-type.ts"

export const characterHighIsleExploration = {
  id: "01a06168-7251-701a-9053-58dd9e433f0e",
  pageTypeSlug: "temper-achievement-category",
  slug: "character-high-isle-exploration",
  title: "Exploration",
  category: "character",
  displayOrder: 0,
  parent: "character-high-isle",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
