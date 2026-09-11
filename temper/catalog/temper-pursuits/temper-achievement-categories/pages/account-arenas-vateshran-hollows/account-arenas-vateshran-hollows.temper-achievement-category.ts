import type { TemperAchievementCategory } from "akasha/temper/catalog/temper-pursuits/temper-achievement-categories/temper-achievement-category.page-type.types.ts"

export const accountArenasVateshranHollows = {
  id: "01a06168-724b-700d-aa3b-29a1d78b879c",
  type: "temper-achievement-category",
  slug: "account-arenas-vateshran-hollows",
  title: "Vateshran Hollows",
  category: "account",
  displayOrder: 3,
  parent: "account-arenas",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
