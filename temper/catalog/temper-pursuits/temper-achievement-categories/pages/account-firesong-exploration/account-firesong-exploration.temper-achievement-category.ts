import type { TemperAchievementCategory } from "akasha/temper/catalog/temper-pursuits/temper-achievement-categories/temper-achievement-category.page-type.types.ts"

export const accountFiresongExploration = {
  id: "01a06168-724f-7016-b976-83a24ee0a2a5",
  type: "temper-achievement-category",
  slug: "account-firesong-exploration",
  title: "Exploration",
  category: "account",
  displayOrder: 3,
  parent: "account-firesong",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
