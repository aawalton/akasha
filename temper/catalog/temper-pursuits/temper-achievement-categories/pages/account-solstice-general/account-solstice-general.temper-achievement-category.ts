import type { TemperAchievementCategory } from "akasha/temper/catalog/temper-pursuits/temper-achievement-categories/temper-achievement-category.page-type.types.ts"

export const accountSolsticeGeneral = {
  id: "01a06168-724d-700a-92cf-66d5d7652bc3",
  type: "temper-achievement-category",
  slug: "account-solstice-general",
  title: "General",
  category: "account",
  displayOrder: 0,
  parent: "account-solstice",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
