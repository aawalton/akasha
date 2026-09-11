import type { TemperAchievementCategory } from "akasha/temper/catalog/temper-pursuits/temper-achievement-categories/temper-achievement-category.page-type.types.ts"

export const accountDlcDungeonsFrostvault = {
  id: "01a06168-7249-7013-9116-4c7cb45abfcc",
  type: "temper-achievement-category",
  slug: "account-dlc-dungeons-frostvault",
  title: "Frostvault",
  category: "account",
  displayOrder: 15,
  parent: "account-dlc-dungeons",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
