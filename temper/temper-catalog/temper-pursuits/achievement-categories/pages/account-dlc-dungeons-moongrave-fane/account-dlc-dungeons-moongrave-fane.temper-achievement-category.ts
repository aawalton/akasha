import type { TemperAchievementCategory } from "../../temper-achievement-category.page-type.ts"

export const accountDlcDungeonsMoongraveFane = {
  id: "01a06168-724a-7004-b282-2ff70d1c7a47",
  pageTypeSlug: "temper-achievement-category",
  slug: "account-dlc-dungeons-moongrave-fane",
  title: "Moongrave Fane",
  category: "account",
  displayOrder: 23,
  parent: "account-dlc-dungeons",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
