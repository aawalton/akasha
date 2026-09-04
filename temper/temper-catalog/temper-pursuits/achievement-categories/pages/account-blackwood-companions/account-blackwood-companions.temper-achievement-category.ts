import type { TemperAchievementCategory } from "../../temper-achievement-category.page-type.ts"

export const accountBlackwoodCompanions = {
  id: "01a06168-724e-7012-868a-5144c9a3c08f",
  pageTypeSlug: "temper-achievement-category",
  slug: "account-blackwood-companions",
  title: "Companions",
  category: "account",
  displayOrder: 1,
  parent: "account-blackwood",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
