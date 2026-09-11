import type { TemperAchievementCategory } from "akasha/temper/catalog/temper-pursuits/temper-achievement-categories/temper-achievement-category.page-type.types.ts"

export const accountInfiniteArchiveExploration = {
  id: "01a06168-724c-7013-97c1-ad1b0e9956b7",
  pageTypeSlug: "temper-achievement-category",
  type: "temper-achievement-category",
  slug: "account-infinite-archive-exploration",
  title: "Exploration",
  category: "account",
  displayOrder: 2,
  parent: "account-infinite-archive",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
