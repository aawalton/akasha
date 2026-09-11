import type { TemperAchievementCategory } from "akasha/temper/catalog/temper-pursuits/temper-achievement-categories/temper-achievement-category.page-type.types.ts"

export const characterOrsiniumExploration = {
  id: "01a06168-7252-7017-8378-7a451639fb00",
  type: "temper-achievement-category",
  slug: "character-orsinium-exploration",
  title: "Exploration",
  category: "character",
  displayOrder: 1,
  parent: "character-orsinium",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
