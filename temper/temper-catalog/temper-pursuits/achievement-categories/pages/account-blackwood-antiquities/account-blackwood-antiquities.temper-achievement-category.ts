import type { TemperAchievementCategory } from "../../temper-achievement-category.page-type.ts"

export const accountBlackwoodAntiquities = {
  id: "01a06168-724e-7014-a651-83b213bc94e7",
  pageTypeSlug: "temper-achievement-category",
  slug: "account-blackwood-antiquities",
  title: "Antiquities",
  category: "account",
  displayOrder: 3,
  parent: "account-blackwood",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
