import type { TemperAchievementCategory } from "../../temper-achievement-category.page-type.ts"

export const accountBlackwoodGeneral = {
  id: "01a06168-724e-7011-b8db-b4efc0994439",
  pageTypeSlug: "temper-achievement-category",
  slug: "account-blackwood-general",
  title: "General",
  category: "account",
  displayOrder: 0,
  parent: "account-blackwood",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
