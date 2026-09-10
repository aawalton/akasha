import type { TemperAchievementCategory } from "../../temper-achievement-category.page-type.types.ts"

export const characterGreymoorExploration = {
  id: "01a06168-7252-7000-8293-a89e3ca0866b",
  pageTypeSlug: "temper-achievement-category",
  type: "temper-achievement-category",
  slug: "character-greymoor-exploration",
  title: "Exploration",
  category: "character",
  displayOrder: 1,
  parent: "character-greymoor",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
