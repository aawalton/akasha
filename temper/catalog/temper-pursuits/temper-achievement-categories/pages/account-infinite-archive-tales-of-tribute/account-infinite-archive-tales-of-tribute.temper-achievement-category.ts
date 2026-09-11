import type { TemperAchievementCategory } from "akasha/temper/catalog/temper-pursuits/temper-achievement-categories/temper-achievement-category.page-type.types.ts"

export const accountInfiniteArchiveTalesOfTribute = {
  id: "01a06168-724c-7012-9d29-c9c3f77addcf",
  type: "temper-achievement-category",
  slug: "account-infinite-archive-tales-of-tribute",
  title: "Tales of Tribute",
  category: "account",
  displayOrder: 1,
  parent: "account-infinite-archive",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
