import type { TemperAchievementCategory } from "akasha/temper/catalog/temper-pursuits/temper-achievement-categories/temper-achievement-category.page-type.types.ts"

export const accountDlcDungeonsRuinsOfMazzatun = {
  id: "01a06168-724a-7008-8ed1-7af1c4ce01c5",
  type: "temper-achievement-category",
  slug: "account-dlc-dungeons-ruins-of-mazzatun",
  title: "Ruins of Mazzatun",
  category: "account",
  displayOrder: 27,
  parent: "account-dlc-dungeons",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
