import type { TemperAchievementCategory } from "../../temper-achievement-category.page-type.ts"

export const accountFiresongQuests = {
  id: "01a06168-724f-7015-b358-7bc2b6f02fce",
  pageTypeSlug: "temper-achievement-category",
  slug: "account-firesong-quests",
  title: "Quests",
  category: "account",
  displayOrder: 2,
  parent: "account-firesong",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
