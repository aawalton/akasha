import type { TemperAchievementCategory } from "akasha/temper/catalog/temper-pursuits/temper-achievement-categories/temper-achievement-category.page-type.types.ts"

export const accountBlackwoodAntiquities = {
  id: "01a06168-724e-7014-a651-83b213bc94e7",
  type: "temper-achievement-category",
  slug: "account-blackwood-antiquities",
  title: "Antiquities",
  category: "account",
  displayOrder: 3,
  parent: "account-blackwood",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
