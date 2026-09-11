import type { TemperAchievementCategory } from "akasha/temper/catalog/temper-pursuits/temper-achievement-categories/temper-achievement-category.page-type.types.ts"

export const accountHighIsleGeneral = {
  id: "01a06168-724e-7008-b0f9-7008d352eb0c",
  type: "temper-achievement-category",
  slug: "account-high-isle-general",
  title: "General",
  category: "account",
  displayOrder: 0,
  parent: "account-high-isle",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
