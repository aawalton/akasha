import type { TemperAchievementCategory } from "../../temper-achievement-category.page-type.ts"

export const accountBlackwoodQuests = {
  id: "01a06168-724e-7016-929e-0b0ad3c72a9e",
  pageTypeSlug: "temper-achievement-category",
  slug: "account-blackwood-quests",
  title: "Quests",
  category: "account",
  displayOrder: 5,
  parent: "account-blackwood",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
