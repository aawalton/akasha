import type { TemperAchievementCategory } from "akasha/temper/catalog/temper-pursuits/temper-achievement-categories/temper-achievement-category.page-type.types.ts"

export const accountClockworkCityGeneral = {
  id: "01a06168-7250-7017-9239-2e0865f69f0f",
  type: "temper-achievement-category",
  slug: "account-clockwork-city-general",
  title: "General",
  category: "account",
  displayOrder: 0,
  parent: "account-clockwork-city",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
