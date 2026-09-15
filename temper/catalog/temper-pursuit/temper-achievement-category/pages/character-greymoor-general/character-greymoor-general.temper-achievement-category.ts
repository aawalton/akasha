import type { TemperAchievementCategory } from "akasha/temper/catalog/temper-pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const characterGreymoorGeneral = {
  id: "01a06168-7251-701e-a5cf-075d93f6a310",
  type: "page-type/temper-achievement-category",
  slug: "character-greymoor-general",
  title: "General",
  category: "character",
  displayOrder: 0,
  parent: "character-greymoor",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
