import type { TemperAchievementCategory } from "../../temper-achievement-category.page-type.ts"

export const accountDlcDungeonsStoneGarden = {
  id: "01a06168-724a-700c-8785-ee60581f4bf7",
  pageTypeSlug: "temper-achievement-category",
  slug: "account-dlc-dungeons-stone-garden",
  title: "Stone Garden",
  category: "account",
  displayOrder: 31,
  parent: "account-dlc-dungeons",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
