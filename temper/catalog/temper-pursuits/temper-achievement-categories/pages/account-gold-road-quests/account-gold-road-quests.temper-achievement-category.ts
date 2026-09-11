import type { TemperAchievementCategory } from "akasha/temper/catalog/temper-pursuits/temper-achievement-categories/temper-achievement-category.page-type.types.ts"

export const accountGoldRoadQuests = {
  id: "01a06168-724d-7016-b1c5-2a5e4b94f8a7",
  type: "temper-achievement-category",
  slug: "account-gold-road-quests",
  title: "Quests",
  category: "account",
  displayOrder: 5,
  parent: "account-gold-road",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
