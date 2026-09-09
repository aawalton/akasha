import type { TemperAchievementCategory } from "../../temper-achievement-category.page-type.ts"

export const accountGreymoorAntiquities = {
  id: "01a06168-724e-7019-9a87-90bca391adf1",
  pageTypeSlug: "temper-achievement-category",
  slug: "account-greymoor-antiquities",
  title: "Antiquities",
  category: "account",
  displayOrder: 1,
  parent: "account-greymoor",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
