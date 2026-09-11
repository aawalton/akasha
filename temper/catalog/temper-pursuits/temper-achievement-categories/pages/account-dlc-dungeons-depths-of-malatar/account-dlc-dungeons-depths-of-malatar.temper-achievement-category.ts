import type { TemperAchievementCategory } from "akasha/temper/catalog/temper-pursuits/temper-achievement-categories/temper-achievement-category.page-type.types.ts"

export const accountDlcDungeonsDepthsOfMalatar = {
  id: "01a06168-7249-700d-9499-99a102b9eca3",
  type: "temper-achievement-category",
  slug: "account-dlc-dungeons-depths-of-malatar",
  title: "Depths of Malatar",
  category: "account",
  displayOrder: 9,
  parent: "account-dlc-dungeons",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
