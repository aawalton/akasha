import type { TemperAchievementCategory } from "akasha/temper/catalog/temper-pursuits/temper-achievement-categories/temper-achievement-category.page-type.types.ts"

export const accountTrialsSunspire = {
  id: "01a06168-724b-7008-b0fa-6b8f3cf4a968",
  pageTypeSlug: "temper-achievement-category",
  type: "temper-achievement-category",
  slug: "account-trials-sunspire",
  title: "Sunspire",
  category: "account",
  displayOrder: 14,
  parent: "account-trials",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
