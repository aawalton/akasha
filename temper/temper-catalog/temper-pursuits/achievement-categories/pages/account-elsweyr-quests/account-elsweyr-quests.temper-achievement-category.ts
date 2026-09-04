import type { TemperAchievementCategory } from "../../temper-achievement-category.page-type.ts"

export const accountElsweyrQuests = {
  id: "01a06168-724f-7008-b3f0-8895e0511114",
  pageTypeSlug: "temper-achievement-category",
  slug: "account-elsweyr-quests",
  title: "Quests",
  category: "account",
  displayOrder: 3,
  parent: "account-elsweyr",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
