import type { TemperAchievementCategory } from "../../temper-achievement-category.page-type.ts"

export const accountHighIsleExploration = {
  id: "01a06168-724e-700d-91c1-e755af09c447",
  pageTypeSlug: "temper-achievement-category",
  slug: "account-high-isle-exploration",
  title: "Exploration",
  category: "account",
  displayOrder: 5,
  parent: "account-high-isle",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
