import type { TemperAchievementCategory } from "akasha/temper/catalog/temper-pursuits/temper-achievement-categories/temper-achievement-category.page-type.types.ts"

export const accountDungeonsVolenfell = {
  id: "01a06168-7248-7016-a6a5-2201d6441d47",
  type: "temper-achievement-category",
  slug: "account-dungeons-volenfell",
  title: "Volenfell",
  category: "account",
  displayOrder: 21,
  parent: "account-dungeons",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
