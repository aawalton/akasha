import type { TemperAchievementCategory } from "../../temper-achievement-category.page-type.ts"

export const accountQuestsCyrodiil = {
  id: "01a06168-724c-700a-8be1-bb66f28868d0",
  pageTypeSlug: "temper-achievement-category",
  slug: "account-quests-cyrodiil",
  title: "Cyrodiil",
  category: "account",
  displayOrder: 7,
  parent: "account-quests",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
