import type { TemperAchievementCategory } from "../../temper-achievement-category.page-type.ts"

export const accountNecromCompanions = {
  id: "01a06168-724e-7001-add9-3376d73ffc9c",
  pageTypeSlug: "temper-achievement-category",
  slug: "account-necrom-companions",
  title: "Companions",
  category: "account",
  displayOrder: 2,
  parent: "account-necrom",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
