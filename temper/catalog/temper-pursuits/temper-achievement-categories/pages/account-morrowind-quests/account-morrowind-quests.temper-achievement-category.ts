import type { TemperAchievementCategory } from "akasha/temper/catalog/temper-pursuits/temper-achievement-categories/temper-achievement-category.page-type.types.ts"

export const accountMorrowindQuests = {
  id: "01a06168-724f-7011-bf60-0dc439518048",
  type: "temper-achievement-category",
  slug: "account-morrowind-quests",
  title: "Quests",
  category: "account",
  displayOrder: 2,
  parent: "account-morrowind",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
