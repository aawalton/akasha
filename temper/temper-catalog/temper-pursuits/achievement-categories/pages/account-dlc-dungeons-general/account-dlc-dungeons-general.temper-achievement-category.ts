import type { TemperAchievementCategory } from "../../temper-achievement-category.page-type.ts"

export const accountDlcDungeonsGeneral = {
  id: "01a06168-7249-7004-b9b3-5019deca5518",
  pageTypeSlug: "temper-achievement-category",
  slug: "account-dlc-dungeons-general",
  title: "General",
  category: "account",
  displayOrder: 0,
  parent: "account-dlc-dungeons",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
