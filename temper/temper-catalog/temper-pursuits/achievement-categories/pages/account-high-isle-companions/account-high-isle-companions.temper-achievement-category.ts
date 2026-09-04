import type { TemperAchievementCategory } from "../../temper-achievement-category.page-type.ts"

export const accountHighIsleCompanions = {
  id: "01a06168-724e-700c-b26b-cb6c1e95f137",
  pageTypeSlug: "temper-achievement-category",
  slug: "account-high-isle-companions",
  title: "Companions",
  category: "account",
  displayOrder: 4,
  parent: "account-high-isle",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
