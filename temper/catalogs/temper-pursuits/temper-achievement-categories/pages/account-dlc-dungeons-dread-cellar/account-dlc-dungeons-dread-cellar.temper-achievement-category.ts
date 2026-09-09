import type { TemperAchievementCategory } from "../../temper-achievement-category.page-type.ts"

export const accountDlcDungeonsDreadCellar = {
  id: "01a06168-7249-700e-935d-30da9b448cef",
  pageTypeSlug: "temper-achievement-category",
  slug: "account-dlc-dungeons-dread-cellar",
  title: "Dread Cellar",
  category: "account",
  displayOrder: 10,
  parent: "account-dlc-dungeons",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
