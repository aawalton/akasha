import type { TemperAchievementCategory } from "akasha/temper/catalog/temper-pursuits/temper-achievement-categories/temper-achievement-category.page-type.types.ts"

export const accountMurkmirePrologue = {
  id: "01a06168-7250-7014-a03a-aa4ed2bc0337",
  type: "temper-achievement-category",
  slug: "account-murkmire-prologue",
  title: "Prologue",
  category: "account",
  displayOrder: 2,
  parent: "account-murkmire",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
