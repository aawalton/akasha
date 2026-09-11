import type { TemperAchievementCategory } from "akasha/temper/catalog/temper-pursuits/temper-achievement-categories/temper-achievement-category.page-type.types.ts"

export const accountQuestsMainQuest = {
  id: "01a06168-724c-7004-b756-06f688f23691",
  pageTypeSlug: "temper-achievement-category",
  type: "temper-achievement-category",
  slug: "account-quests-main-quest",
  title: "Main Quest",
  category: "account",
  displayOrder: 1,
  parent: "account-quests",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
