import type { TemperAchievementCategory } from "../../temper-achievement-category.page-type.ts"

export const accountSummersetQuests = {
  id: "01a06168-724f-700c-a90f-e655a5834de9",
  pageTypeSlug: "temper-achievement-category",
  slug: "account-summerset-quests",
  title: "Quests",
  category: "account",
  displayOrder: 2,
  parent: "account-summerset",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
