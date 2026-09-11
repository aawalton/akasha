import type { TemperAchievementCategory } from "akasha/temper/catalog/temper-pursuits/temper-achievement-categories/temper-achievement-category.page-type.types.ts"

export const accountRecentSeasonsQuests = {
  id: "01a06168-7246-7003-83fb-23b95d1546d6",
  type: "temper-achievement-category",
  slug: "account-recent-seasons-quests",
  title: "Quests",
  category: "account",
  displayOrder: 3,
  parent: "account-recent-seasons",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
