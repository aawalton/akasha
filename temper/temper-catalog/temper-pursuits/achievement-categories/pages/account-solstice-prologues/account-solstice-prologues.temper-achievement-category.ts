import type { TemperAchievementCategory } from "../../temper-achievement-category.page-type.ts"

export const accountSolsticePrologues = {
  id: "01a06168-724d-700d-b33e-e44ccf5c3438",
  pageTypeSlug: "temper-achievement-category",
  slug: "account-solstice-prologues",
  title: "Prologues",
  category: "account",
  displayOrder: 3,
  parent: "account-solstice",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
