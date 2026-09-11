import type { TemperAchievementCategory } from "akasha/temper/catalog/temper-pursuits/temper-achievement-categories/temper-achievement-category.page-type.types.ts"

export const accountElsweyrPrologue = {
  id: "01a06168-724f-7006-8626-7387b924e9ff",
  type: "temper-achievement-category",
  slug: "account-elsweyr-prologue",
  title: "Prologue",
  category: "account",
  displayOrder: 1,
  parent: "account-elsweyr",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
