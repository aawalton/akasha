import type { TemperAchievementCategory } from "../../temper-achievement-category.page-type.ts"

export const accountExplorationCyrodiil = {
  id: "01a06168-724b-7015-95ef-f486d7256ce2",
  pageTypeSlug: "temper-achievement-category",
  slug: "account-exploration-cyrodiil",
  title: "Cyrodiil",
  category: "account",
  displayOrder: 6,
  parent: "account-exploration",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
