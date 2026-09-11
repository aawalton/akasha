import type { TemperAchievementCategory } from "akasha/temper/catalog/temper-pursuits/temper-achievement-categories/temper-achievement-category.page-type.types.ts"

export const accountGoldRoadTalesOfTribute = {
  id: "01a06168-724d-7012-8377-6f1ba87139ad",
  type: "temper-achievement-category",
  slug: "account-gold-road-tales-of-tribute",
  title: "Tales of Tribute",
  category: "account",
  displayOrder: 1,
  parent: "account-gold-road",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
