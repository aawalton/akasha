import type { TemperAchievementCategory } from "../../temper-achievement-category.page-type.ts"

export const accountDlcDungeonsTheCauldron = {
  id: "01a06168-724a-700d-a6a0-82d1a8756ca4",
  pageTypeSlug: "temper-achievement-category",
  slug: "account-dlc-dungeons-the-cauldron",
  title: "The Cauldron",
  category: "account",
  displayOrder: 32,
  parent: "account-dlc-dungeons",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
