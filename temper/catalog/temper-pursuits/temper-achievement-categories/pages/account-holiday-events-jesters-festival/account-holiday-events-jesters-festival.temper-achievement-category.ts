import type { TemperAchievementCategory } from "akasha/temper/catalog/temper-pursuits/temper-achievement-categories/temper-achievement-category.page-type.types.ts"

export const accountHolidayEventsJestersFestival = {
  id: "01a06168-724d-7005-b0d6-3815d2da2344",
  type: "temper-achievement-category",
  slug: "account-holiday-events-jesters-festival",
  title: "Jester's Festival",
  category: "account",
  displayOrder: 2,
  parent: "account-holiday-events",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
