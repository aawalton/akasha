import type { TemperAchievementCategory } from "../../temper-achievement-category.page-type.ts"

export const accountOrsiniumQuests = {
  id: "01a06168-7251-7008-b5f8-491f79e50f9d",
  pageTypeSlug: "temper-achievement-category",
  slug: "account-orsinium-quests",
  title: "Quests",
  category: "account",
  displayOrder: 2,
  parent: "account-orsinium",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
