import type { TemperAchievementCategory } from "../../temper-achievement-category.page-type.ts"

export const accountGoldRoadExploration = {
  id: "01a06168-724d-7014-aec3-148673ff5ee0",
  pageTypeSlug: "temper-achievement-category",
  slug: "account-gold-road-exploration",
  title: "Exploration",
  category: "account",
  displayOrder: 3,
  parent: "account-gold-road",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
