import type { TemperAchievementCategory } from "akasha/temper/catalog/temper-pursuits/temper-achievement-categories/temper-achievement-category.page-type.types.ts"

export const accountFiresongAntiquities = {
  id: "01a06168-724f-7017-a2be-6c2edbd5b083",
  type: "temper-achievement-category",
  slug: "account-firesong-antiquities",
  title: "Antiquities",
  category: "account",
  displayOrder: 4,
  parent: "account-firesong",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
