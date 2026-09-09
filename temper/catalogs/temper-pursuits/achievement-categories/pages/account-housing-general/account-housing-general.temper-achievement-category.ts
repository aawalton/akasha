import type { TemperAchievementCategory } from "../../temper-achievement-category.page-type.ts"

export const accountHousingGeneral = {
  id: "01a06168-724c-7015-86a6-a9ad9ee6cdf8",
  pageTypeSlug: "temper-achievement-category",
  slug: "account-housing-general",
  title: "General",
  category: "account",
  displayOrder: 0,
  parent: "account-housing",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
