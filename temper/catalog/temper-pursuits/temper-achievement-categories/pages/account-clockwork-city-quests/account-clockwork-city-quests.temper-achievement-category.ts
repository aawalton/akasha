import type { TemperAchievementCategory } from "akasha/temper/catalog/temper-pursuits/temper-achievement-categories/temper-achievement-category.page-type.types.ts"

export const accountClockworkCityQuests = {
  id: "01a06168-7250-7019-a3fa-315d07646310",
  type: "temper-achievement-category",
  slug: "account-clockwork-city-quests",
  title: "Quests",
  category: "account",
  displayOrder: 2,
  parent: "account-clockwork-city",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
