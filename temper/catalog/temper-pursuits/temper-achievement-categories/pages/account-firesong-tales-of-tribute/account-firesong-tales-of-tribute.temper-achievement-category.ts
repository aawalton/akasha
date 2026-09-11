import type { TemperAchievementCategory } from "akasha/temper/catalog/temper-pursuits/temper-achievement-categories/temper-achievement-category.page-type.types.ts"

export const accountFiresongTalesOfTribute = {
  id: "01a06168-724f-7018-80a5-42d655ac7651",
  type: "temper-achievement-category",
  slug: "account-firesong-tales-of-tribute",
  title: "Tales of Tribute",
  category: "account",
  displayOrder: 5,
  parent: "account-firesong",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
