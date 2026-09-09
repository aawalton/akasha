import type { TemperAchievementCategory } from "../../temper-achievement-category.page-type.ts"

export const accountRecentSeasonsDynamicEncounters = {
  id: "01a06168-7246-7004-891a-9ac49265eade",
  pageTypeSlug: "temper-achievement-category",
  slug: "account-recent-seasons-dynamic-encounters",
  title: "Dynamic Encounters",
  category: "account",
  displayOrder: 4,
  parent: "account-recent-seasons",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
