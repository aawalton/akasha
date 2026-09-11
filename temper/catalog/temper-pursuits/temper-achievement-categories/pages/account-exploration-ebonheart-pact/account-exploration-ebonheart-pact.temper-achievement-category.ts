import type { TemperAchievementCategory } from "akasha/temper/catalog/temper-pursuits/temper-achievement-categories/temper-achievement-category.page-type.types.ts"

export const accountExplorationEbonheartPact = {
  id: "01a06168-724b-7012-ad35-2736034b06cc",
  type: "temper-achievement-category",
  slug: "account-exploration-ebonheart-pact",
  title: "Ebonheart Pact",
  category: "account",
  displayOrder: 3,
  parent: "account-exploration",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
