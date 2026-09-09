import type { TemperAchievementCategory } from "../../temper-achievement-category.page-type.ts"

export const characterSummersetExploration = {
  id: "01a06168-7252-7006-92d4-1791f84d6c70",
  pageTypeSlug: "temper-achievement-category",
  slug: "character-summerset-exploration",
  title: "Exploration",
  category: "character",
  displayOrder: 1,
  parent: "character-summerset",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
