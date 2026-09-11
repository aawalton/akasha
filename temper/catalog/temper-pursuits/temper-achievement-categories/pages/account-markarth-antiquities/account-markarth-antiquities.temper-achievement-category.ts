import type { TemperAchievementCategory } from "akasha/temper/catalog/temper-pursuits/temper-achievement-categories/temper-achievement-category.page-type.types.ts"

export const accountMarkarthAntiquities = {
  id: "01a06168-7250-700b-9365-8b6c4fbeb2ad",
  pageTypeSlug: "temper-achievement-category",
  type: "temper-achievement-category",
  slug: "account-markarth-antiquities",
  title: "Antiquities",
  category: "account",
  displayOrder: 4,
  parent: "account-markarth",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
