import type { TemperAchievementCategory } from "../../temper-achievement-category.page-type.ts"

export const accountRecentSeasonsVeterancy = {
  id: "01a06168-7246-7002-a674-bbb49ba4aa91",
  pageTypeSlug: "temper-achievement-category",
  slug: "account-recent-seasons-veterancy",
  title: "Veterancy",
  category: "account",
  displayOrder: 2,
  parent: "account-recent-seasons",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
