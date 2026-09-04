import type { TemperAchievementCategory } from "../../temper-achievement-category.page-type.ts"

export const accountCharacterGeneral = {
  id: "01a06168-7246-7006-99f7-c8d2dedd9b78",
  pageTypeSlug: "temper-achievement-category",
  slug: "account-character-general",
  title: "General",
  category: "account",
  displayOrder: 0,
  parent: "account-character",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
