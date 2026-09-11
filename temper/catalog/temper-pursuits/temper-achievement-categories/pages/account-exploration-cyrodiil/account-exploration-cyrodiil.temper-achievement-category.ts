import type { TemperAchievementCategory } from "akasha/temper/catalog/temper-pursuits/temper-achievement-categories/temper-achievement-category.page-type.types.ts"

export const accountExplorationCyrodiil = {
  id: "01a06168-724b-7015-95ef-f486d7256ce2",
  type: "temper-achievement-category",
  slug: "account-exploration-cyrodiil",
  title: "Cyrodiil",
  category: "account",
  displayOrder: 6,
  parent: "account-exploration",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
