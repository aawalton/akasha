import type { TemperAchievementCategory } from "../../temper-achievement-category.page-type.ts"

export const accountCharacterCompanions = {
  id: "01a06168-7246-700e-b83a-765047355090",
  pageTypeSlug: "temper-achievement-category",
  slug: "account-character-companions",
  title: "Companions",
  category: "account",
  displayOrder: 8,
  parent: "account-character",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
