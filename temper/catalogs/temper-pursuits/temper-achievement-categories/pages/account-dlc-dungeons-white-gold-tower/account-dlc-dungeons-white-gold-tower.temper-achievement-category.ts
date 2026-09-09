import type { TemperAchievementCategory } from "../../temper-achievement-category.page-type.ts"

export const accountDlcDungeonsWhiteGoldTower = {
  id: "01a06168-724a-700f-91cc-ad55abbd9648",
  pageTypeSlug: "temper-achievement-category",
  slug: "account-dlc-dungeons-white-gold-tower",
  title: "White Gold Tower",
  category: "account",
  displayOrder: 34,
  parent: "account-dlc-dungeons",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
