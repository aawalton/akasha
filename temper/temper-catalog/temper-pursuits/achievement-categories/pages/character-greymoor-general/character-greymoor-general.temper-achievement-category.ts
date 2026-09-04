import type { TemperAchievementCategory } from "../../temper-achievement-category.page-type.ts"

export const characterGreymoorGeneral = {
  id: "01a06168-7251-701e-a5cf-075d93f6a310",
  pageTypeSlug: "temper-achievement-category",
  slug: "character-greymoor-general",
  title: "General",
  category: "character",
  displayOrder: 0,
  parent: "character-greymoor",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
