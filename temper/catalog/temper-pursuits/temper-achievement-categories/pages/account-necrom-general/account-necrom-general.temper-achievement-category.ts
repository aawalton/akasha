import type { TemperAchievementCategory } from "akasha/temper/catalog/temper-pursuits/temper-achievement-categories/temper-achievement-category.page-type.types.ts"

export const accountNecromGeneral = {
  id: "01a06168-724d-7019-a7ca-e8253edcea27",
  type: "temper-achievement-category",
  slug: "account-necrom-general",
  title: "General",
  category: "account",
  displayOrder: 0,
  parent: "account-necrom",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
