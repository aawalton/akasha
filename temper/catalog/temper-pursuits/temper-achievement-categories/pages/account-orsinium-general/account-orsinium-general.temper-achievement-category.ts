import type { TemperAchievementCategory } from "akasha/temper/catalog/temper-pursuits/temper-achievement-categories/temper-achievement-category.page-type.types.ts"

export const accountOrsiniumGeneral = {
  id: "01a06168-7251-7006-90c4-2bd22993fc1d",
  pageTypeSlug: "temper-achievement-category",
  type: "temper-achievement-category",
  slug: "account-orsinium-general",
  title: "General",
  category: "account",
  displayOrder: 0,
  parent: "account-orsinium",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
