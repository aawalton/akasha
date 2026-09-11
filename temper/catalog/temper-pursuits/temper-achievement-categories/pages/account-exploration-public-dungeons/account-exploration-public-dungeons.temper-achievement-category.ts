import type { TemperAchievementCategory } from "akasha/temper/catalog/temper-pursuits/temper-achievement-categories/temper-achievement-category.page-type.types.ts"

export const accountExplorationPublicDungeons = {
  id: "01a06168-724c-7001-bdd8-2291e71a23a3",
  type: "temper-achievement-category",
  slug: "account-exploration-public-dungeons",
  title: "Public Dungeons",
  category: "account",
  displayOrder: 9,
  parent: "account-exploration",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
