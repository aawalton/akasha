import type { TemperAchievementCategory } from "akasha/temper/catalog/temper-pursuits/temper-achievement-categories/temper-achievement-category.page-type.types.ts"

export const accountDragonholdGeneral = {
  id: "01a06168-7250-700d-9cb6-44746d1959f1",
  type: "temper-achievement-category",
  slug: "account-dragonhold-general",
  title: "General",
  category: "account",
  displayOrder: 0,
  parent: "account-dragonhold",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
