import type { TemperAchievementCategory } from "akasha/temper/catalog/temper-pursuits/temper-achievement-categories/temper-achievement-category.page-type.types.ts"

export const accountExplorationDarkAnchors = {
  id: "01a06168-724b-7016-970c-e7048fde29be",
  pageTypeSlug: "temper-achievement-category",
  type: "temper-achievement-category",
  slug: "account-exploration-dark-anchors",
  title: "Dark Anchors",
  category: "account",
  displayOrder: 7,
  parent: "account-exploration",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
