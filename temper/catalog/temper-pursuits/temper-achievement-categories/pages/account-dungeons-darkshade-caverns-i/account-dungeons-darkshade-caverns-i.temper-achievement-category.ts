import type { TemperAchievementCategory } from "akasha/temper/catalog/temper-pursuits/temper-achievement-categories/temper-achievement-category.page-type.types.ts"

export const accountDungeonsDarkshadeCavernsI = {
  id: "01a06168-7248-700b-9c44-45a7afd81d1d",
  type: "temper-achievement-category",
  slug: "account-dungeons-darkshade-caverns-i",
  title: "Darkshade Caverns I",
  category: "account",
  displayOrder: 10,
  parent: "account-dungeons",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
