import type { TemperAchievementCategory } from "akasha/temper/catalog/temper-pursuits/temper-achievement-categories/temper-achievement-category.page-type.types.ts"

export const accountExplorationCraglorn = {
  id: "01a06168-724b-7014-b7d4-cea221c08f67",
  pageTypeSlug: "temper-achievement-category",
  type: "temper-achievement-category",
  slug: "account-exploration-craglorn",
  title: "Craglorn",
  category: "account",
  displayOrder: 5,
  parent: "account-exploration",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
