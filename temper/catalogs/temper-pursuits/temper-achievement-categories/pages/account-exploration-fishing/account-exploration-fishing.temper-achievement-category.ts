import type { TemperAchievementCategory } from "../../temper-achievement-category.page-type.ts"

export const accountExplorationFishing = {
  id: "01a06168-724c-7000-8ed3-816eafc4372b",
  pageTypeSlug: "temper-achievement-category",
  slug: "account-exploration-fishing",
  title: "Fishing",
  category: "account",
  displayOrder: 8,
  parent: "account-exploration",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
