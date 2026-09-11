import type { TemperAchievementCategory } from "akasha/temper/catalog/temper-pursuits/temper-achievement-categories/temper-achievement-category.page-type.types.ts"

export const accountHolidayEventsWhitestrakesMayhem = {
  id: "01a06168-724d-7003-8081-b173ad5deea4",
  type: "temper-achievement-category",
  slug: "account-holiday-events-whitestrakes-mayhem",
  title: "Whitestrake's Mayhem",
  category: "account",
  displayOrder: 0,
  parent: "account-holiday-events",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
