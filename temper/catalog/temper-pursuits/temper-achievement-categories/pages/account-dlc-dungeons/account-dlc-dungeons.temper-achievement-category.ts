import type { TemperAchievementCategory } from "akasha/temper/catalog/temper-pursuits/temper-achievement-categories/temper-achievement-category.page-type.types.ts"

export const accountDlcDungeons = {
  id: "01a06168-7249-7003-b88d-4a016ab72401",
  type: "temper-achievement-category",
  slug: "account-dlc-dungeons",
  title: "DLC Dungeons",
  category: "account",
  displayOrder: 5,
} as const satisfies TemperAchievementCategory
