import type { TemperAchievementCategory } from "../../temper-achievement-category.page-type.ts"

export const accountDungeonsSelenesWeb = {
  id: "01a06168-7248-7012-86bc-4fd49a71d5f0",
  pageTypeSlug: "temper-achievement-category",
  slug: "account-dungeons-selenes-web",
  title: "Selene's Web",
  category: "account",
  displayOrder: 17,
  parent: "account-dungeons",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
