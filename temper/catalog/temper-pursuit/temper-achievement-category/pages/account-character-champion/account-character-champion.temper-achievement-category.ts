import type { TemperAchievementCategory } from "akasha/temper/catalog/temper-pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const accountCharacterChampion = {
  id: "01a06168-7246-7008-a6fc-d55567bcd2ef",
  type: "temper-achievement-category",
  slug: "account-character-champion",
  title: "Champion",
  category: "account",
  displayOrder: 2,
  parent: "account-character",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
