import type { TemperAchievementCategory } from "akasha/temper/catalog/temper-pursuits/temper-achievement-categories/temper-achievement-category.page-type.types.ts"

export const accountDlcDungeonsFalkreathHold = {
  id: "01a06168-7249-7011-95fe-30760c2260eb",
  type: "temper-achievement-category",
  slug: "account-dlc-dungeons-falkreath-hold",
  title: "Falkreath Hold",
  category: "account",
  displayOrder: 13,
  parent: "account-dlc-dungeons",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
