import type { TemperAchievementCategory } from "akasha/temper/catalog/temper-pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const accountSolsticeQuests = {
  id: "01a06168-724d-700e-a59d-4c51a61d2e0e",
  type: "page-type/temper-achievement-category",
  slug: "account-solstice-quests",
  title: "Quests",
  category: "account",
  displayOrder: 4,
  parent: "account-solstice",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
