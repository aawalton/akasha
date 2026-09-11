import type { TemperAchievementCategory } from "akasha/temper/catalog/temper-pursuits/temper-achievement-categories/temper-achievement-category.page-type.types.ts"

export const accountMurkmireExploration = {
  id: "01a06168-7250-7013-9e82-c648945e7faa",
  type: "temper-achievement-category",
  slug: "account-murkmire-exploration",
  title: "Exploration",
  category: "account",
  displayOrder: 1,
  parent: "account-murkmire",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
