import type { TemperAchievementCategory } from "akasha/temper/catalog/temper-pursuits/temper-achievement-categories/temper-achievement-category.page-type.types.ts"

export const accountDungeons = {
  id: "01a06168-7248-7000-979a-4a4bb8e6bf75",
  type: "temper-achievement-category",
  slug: "account-dungeons",
  title: "Dungeons",
  category: "account",
  displayOrder: 4,
} as const satisfies TemperAchievementCategory
