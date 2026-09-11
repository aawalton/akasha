import type { TemperAchievementCategory } from "akasha/temper/catalog/temper-pursuits/temper-achievement-categories/temper-achievement-category.page-type.types.ts"

export const accountCharacterClass = {
  id: "01a06168-7247-7000-8ad3-312b6a6c7669",
  type: "temper-achievement-category",
  slug: "account-character-class",
  title: "Class",
  category: "account",
  displayOrder: 9,
  parent: "account-character",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
