import type { TemperAchievementCategory } from "akasha/temper/catalog/temper-pursuits/temper-achievement-categories/temper-achievement-category.page-type.types.ts"

export const accountDlcDungeonsCoralAerie = {
  id: "01a06168-7249-700b-b40b-b66dce15253d",
  pageTypeSlug: "temper-achievement-category",
  type: "temper-achievement-category",
  slug: "account-dlc-dungeons-coral-aerie",
  title: "Coral Aerie",
  category: "account",
  displayOrder: 7,
  parent: "account-dlc-dungeons",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
