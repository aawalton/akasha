import type { TemperAchievementCategory } from "akasha/temper/catalog/temper-pursuits/temper-achievement-categories/temper-achievement-category.page-type.types.ts"

export const accountDragonholdExploration = {
  id: "01a06168-7250-700e-bbdd-1dac72cb3933",
  pageTypeSlug: "temper-achievement-category",
  type: "temper-achievement-category",
  slug: "account-dragonhold-exploration",
  title: "Exploration",
  category: "account",
  displayOrder: 1,
  parent: "account-dragonhold",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
