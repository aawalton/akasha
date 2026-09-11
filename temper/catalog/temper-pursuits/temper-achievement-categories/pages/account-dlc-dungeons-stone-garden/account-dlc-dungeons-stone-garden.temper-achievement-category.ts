import type { TemperAchievementCategory } from "akasha/temper/catalog/temper-pursuits/temper-achievement-categories/temper-achievement-category.page-type.types.ts"

export const accountDlcDungeonsStoneGarden = {
  id: "01a06168-724a-700c-8785-ee60581f4bf7",
  type: "temper-achievement-category",
  slug: "account-dlc-dungeons-stone-garden",
  title: "Stone Garden",
  category: "account",
  displayOrder: 31,
  parent: "account-dlc-dungeons",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
