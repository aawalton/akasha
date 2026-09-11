import type { TemperAchievementCategory } from "akasha/temper/catalog/temper-pursuits/temper-achievement-categories/temper-achievement-category.page-type.types.ts"

export const accountHighIsleCompanions = {
  id: "01a06168-724e-700c-b26b-cb6c1e95f137",
  type: "temper-achievement-category",
  slug: "account-high-isle-companions",
  title: "Companions",
  category: "account",
  displayOrder: 4,
  parent: "account-high-isle",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
