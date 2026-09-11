import type { TemperAchievementCategory } from "akasha/temper/catalog/temper-pursuits/temper-achievement-categories/temper-achievement-category.page-type.types.ts"

export const accountDlcDungeonsShipwrightsRegret = {
  id: "01a06168-724a-700b-87f6-88a6541d6bad",
  type: "temper-achievement-category",
  slug: "account-dlc-dungeons-shipwrights-regret",
  title: "Shipwright's Regret",
  category: "account",
  displayOrder: 30,
  parent: "account-dlc-dungeons",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
