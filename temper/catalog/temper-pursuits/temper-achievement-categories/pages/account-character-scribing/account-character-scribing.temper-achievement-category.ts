import type { TemperAchievementCategory } from "akasha/temper/catalog/temper-pursuits/temper-achievement-categories/temper-achievement-category.page-type.types.ts"

export const accountCharacterScribing = {
  id: "01a06168-7247-7001-9935-8f541552d1dc",
  type: "temper-achievement-category",
  slug: "account-character-scribing",
  title: "Scribing",
  category: "account",
  displayOrder: 10,
  parent: "account-character",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
