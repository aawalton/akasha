import type { TemperAchievementCategory } from "akasha/temper/catalog/temper-pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const accountBlackwoodQuests = {
  id: "01a06168-724e-7016-929e-0b0ad3c72a9e",
  type: "page-type/temper-achievement-category",
  slug: "account-blackwood-quests",
  title: "Quests",
  category: "account",
  displayOrder: 5,
  parent: "account-blackwood",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
