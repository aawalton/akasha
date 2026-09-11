import type { TemperAchievementCategory } from "akasha/temper/catalog/temper-pursuits/temper-achievement-categories/temper-achievement-category.page-type.types.ts"

export const accountDungeonsEldenHollowIi = {
  id: "01a06168-7248-700f-b0f2-40ce3da39294",
  type: "temper-achievement-category",
  slug: "account-dungeons-elden-hollow-ii",
  title: "Elden Hollow II",
  category: "account",
  displayOrder: 14,
  parent: "account-dungeons",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
