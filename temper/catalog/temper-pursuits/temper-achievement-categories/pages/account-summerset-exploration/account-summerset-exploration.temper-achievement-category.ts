import type { TemperAchievementCategory } from "akasha/temper/catalog/temper-pursuits/temper-achievement-categories/temper-achievement-category.page-type.types.ts"

export const accountSummersetExploration = {
  id: "01a06168-724f-700b-bf35-71a8920ead56",
  type: "temper-achievement-category",
  slug: "account-summerset-exploration",
  title: "Exploration",
  category: "account",
  displayOrder: 1,
  parent: "account-summerset",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
