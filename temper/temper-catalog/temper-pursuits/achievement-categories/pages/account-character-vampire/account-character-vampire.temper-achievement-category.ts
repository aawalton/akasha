import type { TemperAchievementCategory } from "../../temper-achievement-category.page-type.ts"

export const accountCharacterVampire = {
  id: "01a06168-7246-700c-8d05-e8a37c78d241",
  pageTypeSlug: "temper-achievement-category",
  slug: "account-character-vampire",
  title: "Vampire",
  category: "account",
  displayOrder: 6,
  parent: "account-character",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
