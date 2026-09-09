import type { TemperAchievementCategory } from "../../temper-achievement-category.page-type.ts"

export const accountCharacterTrophies = {
  id: "01a06168-7246-700b-b22f-8b7adcb6a2ef",
  pageTypeSlug: "temper-achievement-category",
  slug: "account-character-trophies",
  title: "Trophies",
  category: "account",
  displayOrder: 5,
  parent: "account-character",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
