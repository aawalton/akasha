import type { TemperAchievementCategory } from "akasha/temper/catalog/temper-pursuits/temper-achievement-categories/temper-achievement-category.page-type.types.ts"

export const accountTrialsLucentCitadel = {
  id: "01a06168-724b-7002-a724-516e95edac65",
  type: "temper-achievement-category",
  slug: "account-trials-lucent-citadel",
  title: "Lucent Citadel",
  category: "account",
  displayOrder: 8,
  parent: "account-trials",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
