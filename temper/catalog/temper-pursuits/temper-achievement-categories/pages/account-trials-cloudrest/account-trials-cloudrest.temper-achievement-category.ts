import type { TemperAchievementCategory } from "akasha/temper/catalog/temper-pursuits/temper-achievement-categories/temper-achievement-category.page-type.types.ts"

export const accountTrialsCloudrest = {
  id: "01a06168-724a-7014-9d11-75bc2fcc5192",
  type: "temper-achievement-category",
  slug: "account-trials-cloudrest",
  title: "Cloudrest",
  category: "account",
  displayOrder: 3,
  parent: "account-trials",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
