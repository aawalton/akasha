import type { TemperAchievementCategory } from "akasha/temper/catalog/temper-pursuits/temper-achievement-categories/temper-achievement-category.page-type.types.ts"

export const accountDeadlandsPrologue = {
  id: "01a06168-7250-7003-85df-8807e5020508",
  type: "temper-achievement-category",
  slug: "account-deadlands-prologue",
  title: "Prologue",
  category: "account",
  displayOrder: 2,
  parent: "account-deadlands",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
