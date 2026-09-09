import type { TemperAchievementCategory } from "../../temper-achievement-category.page-type.ts"

export const accountDlcDungeonsFrostvault = {
  id: "01a06168-7249-7013-9116-4c7cb45abfcc",
  pageTypeSlug: "temper-achievement-category",
  slug: "account-dlc-dungeons-frostvault",
  title: "Frostvault",
  category: "account",
  displayOrder: 15,
  parent: "account-dlc-dungeons",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
