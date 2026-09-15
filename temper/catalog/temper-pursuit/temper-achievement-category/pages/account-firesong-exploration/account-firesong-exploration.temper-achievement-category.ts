import type { TemperAchievementCategory } from "akasha/temper/catalog/temper-pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const accountFiresongExploration = {
  id: "01a06168-724f-7016-b976-83a24ee0a2a5",
  type: "page-type/temper-achievement-category",
  slug: "account-firesong-exploration",
  title: "Exploration",
  category: "account",
  displayOrder: 3,
  parent: "account-firesong",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
