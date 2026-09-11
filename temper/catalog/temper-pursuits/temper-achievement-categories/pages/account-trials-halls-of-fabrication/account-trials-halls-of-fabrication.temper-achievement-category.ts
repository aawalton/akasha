import type { TemperAchievementCategory } from "akasha/temper/catalog/temper-pursuits/temper-achievement-categories/temper-achievement-category.page-type.types.ts"

export const accountTrialsHallsOfFabrication = {
  id: "01a06168-724a-7016-977a-63be18b74f3a",
  type: "temper-achievement-category",
  slug: "account-trials-halls-of-fabrication",
  title: "Halls of Fabrication",
  category: "account",
  displayOrder: 5,
  parent: "account-trials",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
