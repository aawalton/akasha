import type { TemperAchievementCategory } from "akasha/temper/catalog/temper-pursuits/temper-achievement-categories/temper-achievement-category.page-type.types.ts"

export const characterOrsiniumGeneral = {
  id: "01a06168-7252-7016-8a86-fd5236aef167",
  type: "temper-achievement-category",
  slug: "character-orsinium-general",
  title: "General",
  category: "character",
  displayOrder: 0,
  parent: "character-orsinium",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
