import type { TemperAchievementCategory } from "akasha/temper/catalog/temper-pursuits/temper-achievement-categories/temper-achievement-category.page-type.types.ts"

export const accountRecentSeasonsChallengeDifficulty = {
  id: "01a06168-7246-7001-b822-e2ce3fb5245a",
  type: "temper-achievement-category",
  slug: "account-recent-seasons-challenge-difficulty",
  title: "Challenge Difficulty",
  category: "account",
  displayOrder: 1,
  parent: "account-recent-seasons",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
