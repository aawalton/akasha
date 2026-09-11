import type { TemperAchievementCategory } from "akasha/temper/catalog/temper-pursuits/temper-achievement-categories/temper-achievement-category.page-type.types.ts"

export const accountNecromTalesOfTribute = {
  id: "01a06168-724e-7000-8efc-a42483129242",
  type: "temper-achievement-category",
  slug: "account-necrom-tales-of-tribute",
  title: "Tales of Tribute",
  category: "account",
  displayOrder: 1,
  parent: "account-necrom",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
