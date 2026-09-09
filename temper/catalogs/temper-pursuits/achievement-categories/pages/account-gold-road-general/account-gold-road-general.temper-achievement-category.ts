import type { TemperAchievementCategory } from "../../temper-achievement-category.page-type.ts"

export const accountGoldRoadGeneral = {
  id: "01a06168-724d-7011-87ee-c1a6f64aec0d",
  pageTypeSlug: "temper-achievement-category",
  slug: "account-gold-road-general",
  title: "General",
  category: "account",
  displayOrder: 0,
  parent: "account-gold-road",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
