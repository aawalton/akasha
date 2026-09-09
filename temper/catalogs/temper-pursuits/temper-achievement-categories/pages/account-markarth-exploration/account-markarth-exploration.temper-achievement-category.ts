import type { TemperAchievementCategory } from "../../temper-achievement-category.page-type.ts"

export const accountMarkarthExploration = {
  id: "01a06168-7250-7008-a776-ffbbf94c7563",
  pageTypeSlug: "temper-achievement-category",
  slug: "account-markarth-exploration",
  title: "Exploration",
  category: "account",
  displayOrder: 1,
  parent: "account-markarth",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
