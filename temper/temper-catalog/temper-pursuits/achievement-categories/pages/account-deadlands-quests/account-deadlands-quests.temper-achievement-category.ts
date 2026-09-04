import type { TemperAchievementCategory } from "../../temper-achievement-category.page-type.ts"

export const accountDeadlandsQuests = {
  id: "01a06168-7250-7004-822a-1961a0363e77",
  pageTypeSlug: "temper-achievement-category",
  slug: "account-deadlands-quests",
  title: "Quests",
  category: "account",
  displayOrder: 3,
  parent: "account-deadlands",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
