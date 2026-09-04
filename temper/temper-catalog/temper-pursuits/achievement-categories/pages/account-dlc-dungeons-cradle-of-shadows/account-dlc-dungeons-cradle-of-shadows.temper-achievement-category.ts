import type { TemperAchievementCategory } from "../../temper-achievement-category.page-type.ts"

export const accountDlcDungeonsCradleOfShadows = {
  id: "01a06168-7249-700c-9a30-39e9cf6a4b1b",
  pageTypeSlug: "temper-achievement-category",
  slug: "account-dlc-dungeons-cradle-of-shadows",
  title: "Cradle of Shadows",
  category: "account",
  displayOrder: 8,
  parent: "account-dlc-dungeons",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
